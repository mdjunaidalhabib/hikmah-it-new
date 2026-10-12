import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    // ECMS প্ল্যান কিনলে packageId থাকে না (ECMS plan key এখানে থাকে) —
    // ভবিষ্যতে approve করলে ECMS-এ অটো শপ চালু করতে এটা লাগবে
    ecmsPlanKey: { type: String, default: "", trim: true },
    // চেকআউটে কাস্টমারের দেওয়া ECMS শপের নাম
    shopName: { type: String, default: "", trim: true },
    // কাস্টমারের দেওয়া শপ-পাসওয়ার্ডের bcrypt hash (plain password কখনো রাখা হয় না)।
    // select:false — অ্যাডমিন লিস্ট/কোনো API রেসপন্সে আসে না; ECMS-এ প্রভিশন সফল হলে মুছে ফেলা হয়।
    ecmsPasswordHash: { type: String, default: "", select: false },
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

    // ECMS অটো-প্রভিশনিং (ecmsPlanKey থাকলেই প্রযোজ্য)। পাসওয়ার্ড কখনো এখানে সেভ হয় না।
    // none → pending → done | failed ; reject হলে: revoked | revoke_failed (ECMS বন্ধ করা যায়নি, Retry দরকার)
    provisionStatus: {
      type: String,
      enum: ["none", "pending", "done", "failed", "revoked", "revoke_failed"],
      default: "none",
    },
    provisionRevokedAt: { type: Date, default: null },
    ecmsRevokeNote: { type: String, default: "" },
    provisionError: { type: String, default: "" },
    provisionStartedAt: { type: Date, default: null },
    provisionedAt: { type: Date, default: null },
    ecmsResult: { type: String, default: "" }, // created | renewed | already_processed
    ecmsShopId: { type: String, default: "" },
    ecmsShopSlug: { type: String, default: "" },
    ecmsStoreUrl: { type: String, default: "" },
    ecmsAdminUrl: { type: String, default: "" },
    adminNote: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
