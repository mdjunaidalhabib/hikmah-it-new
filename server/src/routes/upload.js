import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadToCloudinary, deleteFromCloudinary, isConfigured } from "../lib/cloudinary.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!isConfigured) {
    return res.status(503).json({ message: "Image upload is not configured. Please set up Cloudinary." });
  }

  const preset = req.body.preset === "logo" ? "logo" : "image";

  const cloudUrl = await uploadToCloudinary(req.file, { preset });
  res.status(201).json({ url: cloudUrl });
});

router.post("/delete", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "No url provided" });
  }
  if (!isConfigured) {
    return res.status(503).json({ message: "Image upload is not configured. Please set up Cloudinary." });
  }

  await deleteFromCloudinary(url);
  res.json({ message: "Image deleted" });
});

export default router;
