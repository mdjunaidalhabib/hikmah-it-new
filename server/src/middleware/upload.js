import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage();

export function saveBufferLocally(file) {
  const ext = path.extname(file.originalname);
  const base = path
    .basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 40);
  const filename = `${Date.now()}-${base}${ext}`;
  fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
  return filename;
}

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];

function fileFilter(req, file, cb) {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
