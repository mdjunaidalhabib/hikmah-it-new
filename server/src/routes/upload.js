import { Router } from "express";
import { upload, saveBufferLocally } from "../middleware/upload.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const preset = req.body.preset === "logo" ? "logo" : "image";

  const cloudUrl = await uploadToCloudinary(req.file, { preset });
  if (cloudUrl) {
    return res.status(201).json({ url: cloudUrl });
  }

  const filename = saveBufferLocally(req.file);
  res.status(201).json({ url: `/uploads/${filename}` });
});

export default router;
