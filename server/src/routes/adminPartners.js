import { Router } from "express";
import Partner from "../models/Partner.js";

const router = Router();

router.get("/", async (req, res) => {
  const partners = await Partner.find({ deletedAt: null }).sort({ sortOrder: 1 });
  res.json(partners);
});

router.post("/", async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Referral code already in use" });
    }
    throw err;
  }
});

router.put("/:id", async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json(partner);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Referral code already in use" });
    }
    throw err;
  }
});

router.delete("/:id", async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ message: "Partner not found" });
  partner.deletedAt = new Date();
  await partner.save();
  res.json({ message: "Moved to trash" });
});

export default router;
