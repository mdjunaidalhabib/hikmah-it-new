import mongoose from "mongoose";

const notificationLogSchema = new mongoose.Schema(
  {
    channel: { type: String, enum: ["email", "sms"], required: true },
    to: { type: String, required: true, trim: true },
    purpose: { type: String, required: true, trim: true },
    status: { type: String, enum: ["sent", "failed", "skipped_not_configured"], required: true },
    errorMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("NotificationLog", notificationLogSchema);
