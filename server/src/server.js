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
