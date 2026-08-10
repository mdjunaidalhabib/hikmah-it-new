import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

const router = Router();

function toAdminUser(user) {
  return {
    _id: user._id,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    referralCode: user.referralCode,
    emailVerified: user.emailVerified,
    mobileVerified: user.mobileVerified,
    suspended: user.suspended,
    createdAt: user.createdAt,
  };
}

router.get("/", async (req, res) => {
  const { q } = req.query;
  const filter = { deletedAt: null };
  if (q) {
    filter.$or = [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }, { mobile: new RegExp(q, "i") }, { referralCode: new RegExp(q, "i") }];
  }
  const users = await User.find(filter).sort({ createdAt: -1 });
  res.json(users.map(toAdminUser));
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).catch(() => null);
  if (!user) return res.status(404).json({ message: "User not found" });

  const orders = await Purchase.find({ userId: user._id, deletedAt: null }).sort({ createdAt: -1 });
  const referredPurchases = await Purchase.find({ referredByUserId: user._id, deletedAt: null });
  const approved = referredPurchases.filter((p) => p.status === "approved");
  const totalEarned = approved.reduce((sum, p) => sum + (p.referralCommission || 0), 0);

  res.json({
    ...toAdminUser(user),
    orders,
    referrals: { totalEarned, approvedCount: approved.length, pendingCount: referredPurchases.length - approved.length },
  });
});

router.patch("/:id/credentials", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findById(req.params.id).catch(() => null);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (email && email.toLowerCase().trim() !== user.email) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
    if (existing) return res.status(409).json({ message: "This email is already used by another account" });
    user.email = normalizedEmail;
  }

  if (password) {
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    user.passwordHash = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.json(toAdminUser(user));
});

router.patch("/:id/suspend", async (req, res) => {
  const { suspended } = req.body;
  const user = await User.findById(req.params.id).catch(() => null);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.suspended = !!suspended;
  await user.save();
  res.json(toAdminUser(user));
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).catch(() => null);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.deletedAt = new Date();
  await user.save();
  res.json({ message: "Moved to trash" });
});

export default router;
