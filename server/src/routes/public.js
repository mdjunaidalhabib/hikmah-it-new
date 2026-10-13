import { Router } from "express";
import bcrypt from "bcryptjs";
import Package from "../models/Package.js";
import Partner from "../models/Partner.js";
import Portfolio from "../models/Portfolio.js";
import Service from "../models/Service.js";
import Testimonial from "../models/Testimonial.js";
import Purchase from "../models/Purchase.js";
import ContactMessage from "../models/ContactMessage.js";
import SiteSettings from "../models/SiteSettings.js";
import User from "../models/User.js";
import requireUserAuth from "../middleware/requireUserAuth.js";
import { sendNewOrderEmail } from "../lib/mailer.js";
import { getEcmsPlans, getEcmsPlanById, isEcmsPackageId, ecmsKeyFromId, ECOMMERCE_CATEGORY } from "../lib/ecmsPlans.js";

const router = Router();

router.get("/packages", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  if (settings.sectionVisibility?.packages === false) return res.json([]);
  // ই-কমার্স প্ল্যানের একমাত্র উৎস ECMS সুপার-অ্যাডমিন — Hikmah-র পুরোনো ই-কমার্স Package
  // (ডাটাবেসে থাকলেও) এখানে বাদ দিয়ে ECMS প্ল্যান বসানো হয়।
  const [own, ecmsPlans] = await Promise.all([
    Package.find({ deletedAt: null, active: { $ne: false }, category: { $ne: ECOMMERCE_CATEGORY } }).sort({ category: 1, sortOrder: 1 }),
    getEcmsPlans(),
  ]);
  res.json([...ecmsPlans, ...own]);
});

// ECMS প্ল্যান (দাম/ফিচার ECMS সুপার-অ্যাডমিন থেকে আসে) — Package আকারে
router.get("/ecms-plans", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  if (settings.sectionVisibility?.packages === false) return res.json([]);
  res.json(await getEcmsPlans());
});

router.get("/packages/:id", async (req, res) => {
  if (isEcmsPackageId(req.params.id)) {
    const plan = await getEcmsPlanById(req.params.id);
    if (!plan || plan.ctaType === "contact") return res.status(404).json({ message: "Package not found" });
    return res.json(plan);
  }
  const pkg = await Package.findOne({ _id: req.params.id, deletedAt: null, active: { $ne: false } }).catch(() => null);
  if (!pkg) return res.status(404).json({ message: "Package not found" });
  res.json(pkg);
});

router.get("/partners", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  if (settings.sectionVisibility?.team === false) return res.json([]);
  const partners = await Partner.find({ deletedAt: null, active: { $ne: false } }).sort({ sortOrder: 1 });
  res.json(partners);
});

router.get("/portfolio", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  if (settings.sectionVisibility?.portfolio === false) return res.json([]);
  const items = await Portfolio.find({ deletedAt: null, active: { $ne: false } }).sort({ sortOrder: 1 });
  res.json(items);
});

router.get("/services", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  if (settings.sectionVisibility?.services === false) return res.json([]);
  const items = await Service.find({ deletedAt: null, active: { $ne: false } }).sort({ sortOrder: 1 });
  res.json(items);
});

router.get("/testimonials", async (req, res) => {
  const items = await Testimonial.find({ deletedAt: null }).sort({ sortOrder: 1 });
  res.json(items);
});

router.get("/settings", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  const { orderNotifications, ...publicSettings } = settings.toObject();
  publicSettings.paymentNumbers = {
    entries: (publicSettings.paymentNumbers?.entries || []).filter((entry) => !entry.deletedAt),
  };
  res.json(publicSettings);
});

router.post("/purchases", requireUserAuth, async (req, res) => {
  const buyer = await User.findById(req.userId);
  if (!buyer) return res.status(401).json({ message: "Not authenticated" });
  if (!buyer.emailVerified || !buyer.mobileVerified) {
    return res.status(403).json({ message: "Please verify your email and mobile number before placing an order" });
  }

  const {
    packageId,
    packageNameSnapshot,
    priceSnapshot,
    customerName,
    customerPhone,
    customerEmail,
    paymentMethod,
    senderNumber,
    transactionId,
    referralCode,
    shopName,
    shopPassword,
  } = req.body;

  if (
    !packageNameSnapshot ||
    !priceSnapshot ||
    !customerName ||
    !customerPhone ||
    !paymentMethod ||
    !senderNumber ||
    !transactionId
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // ECMS প্ল্যান হলে দাম সার্ভারেই ECMS থেকে নেওয়া হয় (ক্লায়েন্টের পাঠানো নয়)
  let ecmsPlan = null;
  if (isEcmsPackageId(packageId)) {
    ecmsPlan = await getEcmsPlanById(packageId);
    if (!ecmsPlan || ecmsPlan.ctaType === "contact") {
      return res.status(400).json({ message: "This plan is not available for purchase" });
    }
  }

  // ECMS প্ল্যান: শপের নাম + পাসওয়ার্ড চেকআউটেই নেওয়া হয়। পাসওয়ার্ড সাথে সাথে hash হয়ে যায়,
  // plain আকারে কোথাও সেভ বা লগ হয় না।
  let ecmsShopName = "";
  let ecmsPasswordHash = "";
  let ecmsEmail = "";
  if (ecmsPlan) {
    ecmsShopName = String(shopName || "").trim();
    if (ecmsShopName.length < 2 || ecmsShopName.length > 60) {
      return res.status(400).json({ message: "Shop name must be between 2 and 60 characters" });
    }

    const rawPassword = String(shopPassword || "");
    // bcrypt শুধু প্রথম ৭২ বাইটই দেখে — তার বেশি হলে বাকিটা নিঃশব্দে বাদ যেত
    if (rawPassword.length < 8 || Buffer.byteLength(rawPassword) > 72) {
      return res.status(400).json({ message: "Shop password must be 8 to 72 characters" });
    }
    if (!/\p{L}/u.test(rawPassword) || !/\d/.test(rawPassword)) {
      return res.status(400).json({ message: "Shop password must contain at least one letter and one number" });
    }

    // এই ইমেইলই ECMS অ্যাডমিন প্যানেলের লগইন — খালি থাকলে ভেরিফায়েড অ্যাকাউন্ট-ইমেইল
    ecmsEmail = String(customerEmail || "").trim().toLowerCase() || buyer.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ecmsEmail)) {
      return res.status(400).json({ message: "A valid email is required for your shop login" });
    }

    ecmsPasswordHash = await bcrypt.hash(rawPassword, 10);
  }

  let referredByUserId = null;
  let referralCommission = 0;
  const trimmedReferralCode = (referralCode || "").trim().toUpperCase();
  if (trimmedReferralCode) {
    const referrer = await User.findOne({ referralCode: trimmedReferralCode, deletedAt: null });
    if (referrer && referrer._id.toString() !== buyer._id.toString()) {
      referredByUserId = referrer._id;
      const pkg = ecmsPlan
        ? ecmsPlan
        : packageId
          ? await Package.findById(packageId).catch(() => null)
          : null;
      if (pkg?.priceAmount) {
        const settings = await SiteSettings.getSingleton();
        const percent = settings.referralCommissionPercent || 0;
        referralCommission = Math.round(pkg.priceAmount * (percent / 100));
      }
    }
  }

  const purchase = await Purchase.create({
    packageId: ecmsPlan ? undefined : packageId || undefined,
    ecmsPlanKey: ecmsPlan ? ecmsKeyFromId(packageId) : "",
    packageNameSnapshot,
    priceSnapshot,
    userId: buyer._id,
    customerName,
    customerPhone,
    customerEmail: ecmsPlan ? ecmsEmail : customerEmail,
    shopName: ecmsShopName,
    ecmsPasswordHash,
    paymentMethod,
    senderNumber,
    transactionId,
    referralCode,
    referredByUserId,
    referralCommission,
  });

  res
    .status(201)
    .json({ message: "Purchase submitted. We will verify and contact you soon.", id: purchase._id });

  const settings = await SiteSettings.getSingleton();
  if (settings.orderNotifications?.enabled && settings.orderNotifications?.recipientEmail) {
    sendNewOrderEmail(settings.orderNotifications.recipientEmail, purchase).catch((err) =>
      console.error("[mailer] Failed to send new order notification:", err)
    );
  }
});

router.post("/contact", async (req, res) => {
  const { name, phone, service, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  await ContactMessage.create({ name, phone, service, message });
  res.status(201).json({ message: "Message received. We will contact you soon." });
});

export default router;
