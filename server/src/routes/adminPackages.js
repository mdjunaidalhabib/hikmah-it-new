import { Router } from "express";
import Package from "../models/Package.js";

const router = Router();

router.get("/", async (req, res) => {
  const packages = await Package.find({ deletedAt: null }).sort({ category: 1, sortOrder: 1 });
  res.json(packages);
});

router.post("/", async (req, res) => {
  const pkg = await Package.create(req.body);
  res.status(201).json(pkg);
});

router.put("/:id", async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pkg) return res.status(404).json({ message: "Package not found" });
  res.json(pkg);
});

router.delete("/:id", async (req, res) => {
  const pkg = await Package.findById(req.params.id).catch(() => null);
  if (!pkg) return res.status(404).json({ message: "Package not found" });

  pkg.deletedAt = new Date();
  await pkg.save();
  res.json({ message: "Moved to trash" });
});

export default router;
