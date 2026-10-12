import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    resetTokenHash: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },

    // Bookkeeping for syncing credentials from server/.env (see lib/seedAdmin.js).
    // They remember which .env values were last applied, so the sync only runs
    // when .env actually changes — and never overwrites a password the admin
    // later changed through the "forgot password" flow.
    envEmail: { type: String, default: null, select: false },
    envPasswordHash: { type: String, default: null, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("AdminUser", adminUserSchema);
