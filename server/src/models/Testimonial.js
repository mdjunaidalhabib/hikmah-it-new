import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    quote: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },
    category: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    sortOrder: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
