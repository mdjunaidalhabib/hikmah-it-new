import mongoose from "mongoose";

const paymentEntrySchema = new mongoose.Schema(
  {
    methods: { type: [String], default: [] },
    number: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
  },
  { _id: true }
);

const bankAccountEntrySchema = new mongoose.Schema(
  {
    bankName: { type: String, default: "" },
    accountName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    branch: { type: String, default: "" },
  },
  { _id: true }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, default: "" },
    tagline: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },
    facebook: { type: String, default: "" },
    footerAbout: { type: String, default: "" },
    paymentNumbers: {
      entries: { type: [paymentEntrySchema], default: [] },
    },
    bankAccounts: { type: [bankAccountEntrySchema], default: [] },
    orderNotifications: {
      enabled: { type: Boolean, default: false },
      recipientEmail: { type: String, default: "" },
    },
    referralCommissionPercent: { type: Number, default: 5 },
    sectionVisibility: {
      services: { type: Boolean, default: true },
      packages: { type: Boolean, default: true },
      portfolio: { type: Boolean, default: true },
      team: { type: Boolean, default: true },
    },
    founder: {
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      location: { type: String, default: "" },
      bio: { type: String, default: "" },
      skills: { type: [String], default: [] },
      photoUrl: { type: String, default: "" },
      facebook: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

siteSettingsSchema.statics.getSingleton = async function getSingleton() {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

export default mongoose.model("SiteSettings", siteSettingsSchema);
