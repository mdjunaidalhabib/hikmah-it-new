import { Router } from "express";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import requireAdminAuth from "../middleware/requireAdminAuth.js";
import { signAdminToken, generateResetToken, hashToken } from "../lib/token.js";
import { sendPasswordResetEmail } from "../lib/mailer.js";

const router = Router();

const COOKIE_NAME = "admin_token";
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signAdminToken(admin._id.toString());
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.json({ email: admin.email });
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: "lax", secure: cookieOptions.secure });
  res.json({ message: "Logged out" });
});

router.get("/me", requireAdminAuth, async (req, res) => {
  const admin = await AdminUser.findById(req.adminId).select("email");
  if (!admin) return res.status(401).json({ message: "Not authenticated" });
  res.json({ email: admin.email });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const genericResponse = { message: "If that email is registered, a reset link has been sent." };

  if (!email) return res.json(genericResponse);

  const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
  if (!admin) return res.json(genericResponse);

  const { rawToken, tokenHash } = generateResetToken();
  admin.resetTokenHash = tokenHash;
  admin.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
  await admin.save();

  const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${rawToken}`;
  await sendPasswordResetEmail(admin.email, resetUrl);

  res.json(genericResponse);
});

router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const tokenHash = hashToken(req.params.token);
  const admin = await AdminUser.findOne({
    resetTokenHash: tokenHash,
    resetTokenExpires: { $gt: new Date() },
  });

  if (!admin) {
    return res.status(400).json({ message: "This reset link is invalid or has expired" });
  }

  admin.passwordHash = await bcrypt.hash(password, 10);
  admin.resetTokenHash = null;
  admin.resetTokenExpires = null;
  await admin.save();

  res.json({ message: "Password has been reset. You can now log in." });
});

export default router;
