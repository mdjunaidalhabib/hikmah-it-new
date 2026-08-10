import { Router } from "express";
import Service from "../models/Service.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await Service.find({ deletedAt: null }).sort({ sortOrder: 1 });
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = await Service.create(req.body);
  res.status(201).json(item);
});

router.put("/:id", async (req, res) => {
  const item = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Service not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Service not found" });
  item.deletedAt = new Date();
  await item.save();
  res.json({ message: "Moved to trash" });
});

export default router;
