import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, enum: ["new", "read"], default: "new" },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);
