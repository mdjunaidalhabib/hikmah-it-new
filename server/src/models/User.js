import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true, immutable: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true, trim: true, uppercase: true },
    suspended: { type: Boolean, default: false },

    emailVerified: { type: Boolean, default: false },
    mobileVerified: { type: Boolean, default: false },

    emailOtpHash: { type: String, default: null },
    emailOtpExpires: { type: Date, default: null },
    emailOtpLastSentAt: { type: Date, default: null },

    mobileOtpHash: { type: String, default: null },
    mobileOtpExpires: { type: Date, default: null },
    mobileOtpLastSentAt: { type: Date, default: null },

    passwordResetOtpHash: { type: String, default: null },
    passwordResetOtpExpires: { type: Date, default: null },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
