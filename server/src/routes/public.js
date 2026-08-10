import { Router } from "express";
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

const router = Router();

router.get("/packages", async (req, res) => {
  const packages = await Package.find({ deletedAt: null, active: { $ne: false } }).sort({ category: 1, sortOrder: 1 });
  res.json(packages);
});

router.get("/packages/:id", async (req, res) => {
  const pkg = await Package.findOne({ _id: req.params.id, deletedAt: null, active: { $ne: false } }).catch(() => null);
  if (!pkg) return res.status(404).json({ message: "Package not found" });
  res.json(pkg);
});

router.get("/partners", async (req, res) => {
  const partners = await Partner.find({ deletedAt: null, active: { $ne: false } }).sort({ sortOrder: 1 });
  res.json(partners);
});

router.get("/portfolio", async (req, res) => {
  const items = await Portfolio.find({ deletedAt: null, active: { $ne: false } }).sort({ sortOrder: 1 });
  res.json(items);
});

router.get("/services", async (req, res) => {
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

  let referredByUserId = null;
  let referralCommission = 0;
  const trimmedReferralCode = (referralCode || "").trim().toUpperCase();
  if (trimmedReferralCode) {
    const referrer = await User.findOne({ referralCode: trimmedReferralCode, deletedAt: null });
    if (referrer && referrer._id.toString() !== buyer._id.toString()) {
      referredByUserId = referrer._id;
      const pkg = packageId ? await Package.findById(packageId).catch(() => null) : null;
      if (pkg?.priceAmount) {
        const settings = await SiteSettings.getSingleton();
        const percent = settings.referralCommissionPercent || 0;
        referralCommission = Math.round(pkg.priceAmount * (percent / 100));
      }
    }
  }

  const purchase = await Purchase.create({
    packageId: packageId || undefined,
    packageNameSnapshot,
    priceSnapshot,
    userId: buyer._id,
    customerName,
    customerPhone,
    customerEmail,
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
