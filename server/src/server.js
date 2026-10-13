import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import { seedAdmin } from "./lib/seedAdmin.js";

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set in server/.env");
    process.exit(1);
  }

  if (!process.env.MONGODB_DB_NAME) {
    console.error("MONGODB_DB_NAME is not set in server/.env");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in server/.env");
    process.exit(1);
  }

  // ECMS ইন্টিগ্রেশন env — না থাকলে সাইট চলে, কিন্তু ই-কমার্স প্ল্যান ও শপ চালু বন্ধ থাকে।
  // তাই ভুল যেন চোখে পড়ে, লগে স্পষ্ট error দেওয়া হয়।
  if (!process.env.ECMS_API_URL) {
    console.error("[ENV CHECK] ❌ ECMS_API_URL সেট নেই — ই-কমার্স প্ল্যান (pricing/ecommerce পেজে) দেখাবে না");
  }
  if (!process.env.ECMS_INTEGRATION_KEY) {
    console.error("[ENV CHECK] ❌ ECMS_INTEGRATION_KEY সেট নেই — Purchase approve করলে ECMS-এ শপ চালু হবে না");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  });
  console.log("Connected to MongoDB");

  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
