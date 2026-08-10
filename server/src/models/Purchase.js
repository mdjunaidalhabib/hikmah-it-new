import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    packageNameSnapshot: { type: String, required: true },
    priceSnapshot: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    customerEmail: { type: String, default: "", trim: true },
    paymentMethod: { type: String, enum: ["bKash", "Nagad", "Rocket", "Bank"], required: true },
    senderNumber: { type: String, required: true, trim: true },
    transactionId: { type: String, required: true, trim: true },
    referralCode: { type: String, default: "", trim: true },
    referredByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    referralCommission: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    adminNote: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
