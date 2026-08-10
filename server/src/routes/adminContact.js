import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = Router();

router.get("/", async (req, res) => {
  const { status } = req.query;
  const filter = { deletedAt: null };
  if (status) filter.status = status;
  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  res.json(messages);
});

router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  if (status && !["new", "read"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    status ? { status } : {},
    { new: true }
  );
  if (!message) return res.status(404).json({ message: "Message not found" });
  res.json(message);
});

router.delete("/:id", async (req, res) => {
  const message = await ContactMessage.findById(req.params.id).catch(() => null);
  if (!message) return res.status(404).json({ message: "Message not found" });

  message.deletedAt = new Date();
  await message.save();
  res.json({ message: "Moved to trash" });
});

export default router;
