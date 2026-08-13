import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    priceAmount: { type: Number, default: 0 },
    originalPriceAmount: { type: Number, default: 0 },
    priceLabel: { type: String, default: "" },
    periodLabel: { type: String, default: "" },
    renewalText: { type: String, default: "" },
    limits: { type: [String], default: [] },
    text: { type: String, default: "" },
    features: { type: [String], default: [] },
    notIncluded: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
