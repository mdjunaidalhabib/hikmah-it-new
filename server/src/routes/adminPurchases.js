import { Router } from "express";
import Purchase from "../models/Purchase.js";

const router = Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  const filter = { deletedAt: null };
  if (status) filter.status = status;
  const purchases = await Purchase.find(filter).sort({ createdAt: -1 });
  res.json(purchases);
});

router.patch("/:id", async (req, res) => {
  const { status, adminNote } = req.body;
  if (status && !["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const update = {};
  if (status) update.status = status;
  if (adminNote !== undefined) update.adminNote = adminNote;

  const purchase = await Purchase.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!purchase) return res.status(404).json({ message: "Purchase not found" });
  res.json(purchase);
});

router.delete("/:id", async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).catch(() => null);
  if (!purchase) return res.status(404).json({ message: "Purchase not found" });

  purchase.deletedAt = new Date();
  await purchase.save();
  res.json({ message: "Moved to trash" });
});

export default router;
