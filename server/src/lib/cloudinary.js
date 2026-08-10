import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
export const isConfigured = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);

if (isConfigured) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

export async function uploadToCloudinary(file, { preset = "image" } = {}) {
  if (!isConfigured) return null;

  const isSvg = file.mimetype === "image/svg+xml";
  const width = preset === "logo" ? 400 : 1200;

  const uploadOptions = {
    folder: "hikmah-it",
    resource_type: "image",
    ...(isSvg
      ? {}
      : {
          transformation: [{ width, crop: "limit", fetch_format: "webp", quality: "auto:good" }],
        }),
  };

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
    stream.end(file.buffer);
  });

  return result.secure_url;
}

function extractPublicId(url) {
  const match = String(url).match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/);
  return match ? match[1] : null;
}

export async function deleteFromCloudinary(url) {
  if (!isConfigured || !url) return;
  const publicId = extractPublicId(url);
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
