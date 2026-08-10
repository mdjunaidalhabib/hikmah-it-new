import { Router } from "express";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import ContactMessage from "../models/ContactMessage.js";
import Package from "../models/Package.js";
import Service from "../models/Service.js";
import Portfolio from "../models/Portfolio.js";
import Partner from "../models/Partner.js";
import Testimonial from "../models/Testimonial.js";
import SiteSettings from "../models/SiteSettings.js";
import { deleteFromCloudinary } from "../lib/cloudinary.js";

const router = Router();

router.get("/", async (req, res) => {
  const [users, orders, messages, packages, services, portfolioItems, partners, testimonials, settings] = await Promise.all([
    User.find({ deletedAt: { $ne: null } }),
    Purchase.find({ deletedAt: { $ne: null } }),
    ContactMessage.find({ deletedAt: { $ne: null } }),
    Package.find({ deletedAt: { $ne: null } }),
    Service.find({ deletedAt: { $ne: null } }),
    Portfolio.find({ deletedAt: { $ne: null } }),
    Partner.find({ deletedAt: { $ne: null } }),
    Testimonial.find({ deletedAt: { $ne: null } }),
    SiteSettings.getSingleton(),
  ]);

  const items = [
    ...users.map((u) => ({
      type: "user",
      id: u._id,
      title: u.name,
      subtitle: `${u.mobile} · ${u.email}`,
      deletedAt: u.deletedAt,
    })),
    ...orders.map((o) => ({
      type: "order",
      id: o._id,
      title: `${o.packageNameSnapshot} — ${o.priceSnapshot}`,
      subtitle: `${o.customerName} · ${o.customerPhone}`,
      deletedAt: o.deletedAt,
    })),
    ...messages.map((m) => ({
      type: "message",
      id: m._id,
      title: m.name,
      subtitle: m.phone,
      deletedAt: m.deletedAt,
    })),
    ...packages.map((p) => ({
      type: "package",
      id: p._id,
      title: p.name,
      subtitle: p.category,
      deletedAt: p.deletedAt,
    })),
    ...services.map((s) => ({
      type: "service",
      id: s._id,
      title: s.title,
      subtitle: s.href,
      deletedAt: s.deletedAt,
    })),
    ...portfolioItems.map((p) => ({
      type: "portfolio",
      id: p._id,
      title: p.title,
      subtitle: p.category,
      deletedAt: p.deletedAt,
    })),
    ...partners.map((p) => ({
      type: "partner",
      id: p._id,
      title: p.name,
      subtitle: p.role,
      deletedAt: p.deletedAt,
    })),
    ...testimonials.map((t) => ({
      type: "testimonial",
      id: t._id,
      title: t.name,
      subtitle: t.quote,
      deletedAt: t.deletedAt,
    })),
    ...(settings.paymentNumbers?.entries || [])
      .filter((entry) => entry.deletedAt)
      .map((entry) => ({
        type: "paymentNumber",
        id: entry._id,
        title: entry.number,
        subtitle: entry.methods.join(" / "),
        deletedAt: entry.deletedAt,
      })),
  ].sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));

  res.json(items);
});

async function restoreItem(type, id) {
  switch (type) {
    case "user":
      return User.findByIdAndUpdate(id, { deletedAt: null });
    case "order":
      return Purchase.findByIdAndUpdate(id, { deletedAt: null });
    case "message":
      return ContactMessage.findByIdAndUpdate(id, { deletedAt: null });
    case "package":
      return Package.findByIdAndUpdate(id, { deletedAt: null });
    case "service":
      return Service.findByIdAndUpdate(id, { deletedAt: null });
    case "portfolio":
      return Portfolio.findByIdAndUpdate(id, { deletedAt: null });
    case "partner":
      return Partner.findByIdAndUpdate(id, { deletedAt: null });
    case "testimonial":
      return Testimonial.findByIdAndUpdate(id, { deletedAt: null });
    case "paymentNumber": {
      const settings = await SiteSettings.getSingleton();
      const entry = settings.paymentNumbers.entries.id(id);
      if (!entry) return null;
      entry.deletedAt = null;
      await settings.save();
      return entry;
    }
    default:
      return null;
  }
}

async function permanentlyDeleteItem(type, id) {
  switch (type) {
    case "user":
      return User.findByIdAndDelete(id);
    case "order":
      return Purchase.findByIdAndDelete(id);
    case "message":
      return ContactMessage.findByIdAndDelete(id);
    case "package":
      return Package.findByIdAndDelete(id);
    case "service":
      return Service.findByIdAndDelete(id);
    case "portfolio": {
      const portfolioItem = await Portfolio.findByIdAndDelete(id);
      if (portfolioItem?.imageUrl) await deleteFromCloudinary(portfolioItem.imageUrl);
      return portfolioItem;
    }
    case "partner": {
      const partner = await Partner.findByIdAndDelete(id);
      if (partner?.photoUrl) await deleteFromCloudinary(partner.photoUrl);
      return partner;
    }
    case "testimonial":
      return Testimonial.findByIdAndDelete(id);
    case "paymentNumber": {
      const settings = await SiteSettings.getSingleton();
      const entry = settings.paymentNumbers.entries.id(id);
      if (!entry) return null;
      entry.deleteOne();
      await settings.save();
      return entry;
    }
    default:
      return null;
  }
}

const VALID_TYPES = ["user", "order", "message", "package", "service", "portfolio", "partner", "testimonial", "paymentNumber"];

router.post("/:type/:id/restore", async (req, res) => {
  const { type, id } = req.params;
  if (!VALID_TYPES.includes(type)) return res.status(400).json({ message: "Invalid type" });

  const result = await restoreItem(type, id).catch(() => null);
  if (!result) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Restored" });
});

router.delete("/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  if (!VALID_TYPES.includes(type)) return res.status(400).json({ message: "Invalid type" });

  const result = await permanentlyDeleteItem(type, id).catch(() => null);
  if (!result) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Permanently deleted" });
});

export default router;
