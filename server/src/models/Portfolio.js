import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    url: { type: String, default: "" },
    text: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
