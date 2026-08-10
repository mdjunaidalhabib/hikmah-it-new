import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import requireUserAuth from "../middleware/requireUserAuth.js";
import { signUserToken, generateOtp, hashToken } from "../lib/token.js";
import { sendVerificationEmailOtp, sendPasswordResetOtp } from "../lib/mailer.js";
import { sendMobileOtp } from "../lib/sms.js";

const router = Router();

const COOKIE_NAME = "user_token";
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const EMAIL_OTP_TTL_MS = 5 * 60 * 1000;
const MOBILE_OTP_TTL_MS = 5 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const MOBILE_RE = /^01[3-9]\d{8}$/;

function toPublicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    referralCode: user.referralCode,
    emailVerified: user.emailVerified,
    mobileVerified: user.mobileVerified,
    createdAt: user.createdAt,
  };
}

async function generateUniqueReferralCode(name) {
  const base = (name || "USER")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 6) || "USER";

  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = String(Math.floor(1000 + Math.random() * 9000));
    const code = `${base}${suffix}`;
    // eslint-disable-next-line no-await-in-loop
    const existing = await User.findOne({ referralCode: code });
    if (!existing) return code;
  }
  throw new Error("Could not generate a unique referral code, please try again");
}

router.post("/signup", async (req, res) => {
  const { name, mobile, email, password, confirmPassword } = req.body;

  if (!name || !mobile || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "সবগুলো ফিল্ড পূরণ করুন" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "পাসওয়ার্ড দুটি মিলছে না" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে" });
  }
  if (!MOBILE_RE.test(mobile.trim())) {
    return res.status(400).json({ message: "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)" });
  }

  const normalizedMobile = mobile.trim();
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await User.findOne({ $or: [{ mobile: normalizedMobile }, { email: normalizedEmail }] });
  if (existing) {
    return res.status(409).json({
      message: existing.mobile === normalizedMobile ? "এই মোবাইল নাম্বার দিয়ে আগে থেকেই অ্যাকাউন্ট আছে" : "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const referralCode = await generateUniqueReferralCode(name);

  // Verification codes are not sent automatically here — the user triggers each one
  // explicitly from the verify page (via /resend-email-otp / /resend-mobile-otp), so a
  // typo'd mobile number or an abandoned signup doesn't burn an SMS credit.
  const user = await User.create({
    name: name.trim(),
    mobile: normalizedMobile,
    email: normalizedEmail,
    passwordHash,
    referralCode,
  });

  const token = signUserToken(user._id.toString());
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(201).json(toPublicUser(user));
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "মোবাইল/ইমেইল এবং পাসওয়ার্ড দিন" });
  }

  const normalized = identifier.trim().toLowerCase();
  const user = await User.findOne({ $or: [{ mobile: identifier.trim() }, { email: normalized }] });
  if (!user || user.deletedAt) {
    return res.status(401).json({ message: "মোবাইল/ইমেইল অথবা পাসওয়ার্ড সঠিক নয়" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "মোবাইল/ইমেইল অথবা পাসওয়ার্ড সঠিক নয়" });
  }

  if (user.suspended) {
    return res.status(403).json({ message: "আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে। সাপোর্টে যোগাযোগ করুন।" });
  }

  const token = signUserToken(user._id.toString());
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.json(toPublicUser(user));
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: "lax", secure: cookieOptions.secure });
  res.json({ message: "লগআউট হয়েছে" });
});

router.get("/me", requireUserAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });
  res.json(toPublicUser(user));
});

router.post("/verify-email", requireUserAuth, async (req, res) => {
  const { otp } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });

  if (user.emailVerified) {
    return res.json(toPublicUser(user));
  }

  if (!otp || !user.emailOtpHash || !user.emailOtpExpires || user.emailOtpExpires < new Date() || hashToken(otp) !== user.emailOtpHash) {
    return res.status(400).json({ message: "কোডটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে" });
  }

  user.emailVerified = true;
  user.emailOtpHash = null;
  user.emailOtpExpires = null;
  await user.save();
  res.json(toPublicUser(user));
});

router.post("/resend-email-otp", requireUserAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });
  if (user.emailVerified) return res.json({ message: "ইমেইল আগে থেকেই ভেরিফাইড" });

  if (user.emailOtpLastSentAt && Date.now() - user.emailOtpLastSentAt.getTime() < OTP_RESEND_COOLDOWN_MS) {
    return res.status(429).json({ message: "আবার কোড চাওয়ার আগে একটু অপেক্ষা করুন" });
  }

  const otp = generateOtp();
  user.emailOtpHash = hashToken(otp);
  user.emailOtpExpires = new Date(Date.now() + EMAIL_OTP_TTL_MS);
  user.emailOtpLastSentAt = new Date();
  await user.save();

  try {
    await sendVerificationEmailOtp(user.email, otp);
  } catch (err) {
    console.error("[userAuth] Failed to resend email OTP:", err);
    return res.status(502).json({ message: "ইমেইলে কোড পাঠাতে সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" });
  }
  res.json({ message: "ভেরিফিকেশন কোড পাঠানো হয়েছে" });
});

router.post("/verify-mobile", requireUserAuth, async (req, res) => {
  const { otp } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });

  if (user.mobileVerified) {
    return res.json(toPublicUser(user));
  }

  if (!otp || !user.mobileOtpHash || !user.mobileOtpExpires || user.mobileOtpExpires < new Date() || hashToken(otp) !== user.mobileOtpHash) {
    return res.status(400).json({ message: "কোডটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে" });
  }

  user.mobileVerified = true;
  user.mobileOtpHash = null;
  user.mobileOtpExpires = null;
  await user.save();
  res.json(toPublicUser(user));
});

router.post("/resend-mobile-otp", requireUserAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });
  if (user.mobileVerified) return res.json({ message: "মোবাইল নাম্বার আগে থেকেই ভেরিফাইড" });

  if (user.mobileOtpLastSentAt && Date.now() - user.mobileOtpLastSentAt.getTime() < OTP_RESEND_COOLDOWN_MS) {
    return res.status(429).json({ message: "আবার কোড চাওয়ার আগে একটু অপেক্ষা করুন" });
  }

  const otp = generateOtp();
  user.mobileOtpHash = hashToken(otp);
  user.mobileOtpExpires = new Date(Date.now() + MOBILE_OTP_TTL_MS);
  user.mobileOtpLastSentAt = new Date();
  await user.save();

  try {
    await sendMobileOtp(user.mobile, otp);
  } catch (err) {
    console.error("[userAuth] Failed to resend mobile OTP:", err);
    return res.status(502).json({ message: "মোবাইলে কোড পাঠাতে সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" });
  }
  res.json({ message: "ভেরিফিকেশন কোড পাঠানো হয়েছে" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const genericResponse = { message: "যদি এই ইমেইলটি নিবন্ধিত থাকে, তাহলে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।" };
  if (!email) return res.json(genericResponse);

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.json(genericResponse);

  const otp = generateOtp();
  user.passwordResetOtpHash = hashToken(otp);
  user.passwordResetOtpExpires = new Date(Date.now() + EMAIL_OTP_TTL_MS);
  await user.save();

  await sendPasswordResetOtp(user.email, otp).catch((err) => console.error("[userAuth] Failed to send password reset OTP:", err));
  res.json(genericResponse);
});

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "ইমেইল, কোড এবং নতুন পাসওয়ার্ড দিন" });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ message: "পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (
    !user ||
    !user.passwordResetOtpHash ||
    !user.passwordResetOtpExpires ||
    user.passwordResetOtpExpires < new Date() ||
    hashToken(otp) !== user.passwordResetOtpHash
  ) {
    return res.status(400).json({ message: "কোডটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে" });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordResetOtpHash = null;
  user.passwordResetOtpExpires = null;
  await user.save();

  res.json({ message: "পাসওয়ার্ড রিসেট হয়েছে। এখন লগইন করতে পারবেন।" });
});

router.get("/me/orders", requireUserAuth, async (req, res) => {
  const orders = await Purchase.find({ userId: req.userId, deletedAt: null }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/me/referrals", requireUserAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ message: "আপনি লগইন করেননি" });

  const referredPurchases = await Purchase.find({ referredByUserId: req.userId, deletedAt: null }).sort({ createdAt: -1 });
  const approved = referredPurchases.filter((p) => p.status === "approved");
  const totalEarned = approved.reduce((sum, p) => sum + (p.referralCommission || 0), 0);

  res.json({
    referralCode: user.referralCode,
    totalEarned,
    approvedCount: approved.length,
    pendingCount: referredPurchases.length - approved.length,
    referrals: referredPurchases,
  });
});

export default router;
