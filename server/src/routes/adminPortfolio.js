import { Router } from "express";
import Portfolio from "../models/Portfolio.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await Portfolio.find({ deletedAt: null }).sort({ sortOrder: 1 });
  res.json(items);
});

router.post("/", async (req, res) => {
  const item = await Portfolio.create(req.body);
  res.status(201).json(item);
});

router.put("/:id", async (req, res) => {
  const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Portfolio item not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Portfolio.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Portfolio item not found" });
  item.deletedAt = new Date();
  await item.save();
  res.json({ message: "Moved to trash" });
});

export default router;
