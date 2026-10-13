// এক-বারের ক্লিনআপ: Hikmah-র নিজস্ব পুরোনো "ই-কমার্স ওয়েবসাইট" Package ডাটাবেস থেকে স্থায়ীভাবে মোছে।
// এখন এই প্ল্যানগুলোর একমাত্র উৎস ECMS সুপার-অ্যাডমিন।
//
// ব্যবহার (server/ ফোল্ডার থেকে):
//   node src/scripts/removeOldEcommercePackages.js            # শুধু দেখায় কী মুছবে (কিছু মোছে না)
//   node src/scripts/removeOldEcommercePackages.js --confirm  # সত্যিই মোছে
//
// নিরাপত্তা:
// - ডিফল্টে dry-run। --confirm না দিলে কিছুই মোছে না।
// - পুরোনো Purchase রেকর্ডে নামের snapshot থাকে (packageNameSnapshot), তাই অর্ডারের ইতিহাস নষ্ট হয় না।
// - মোছার আগে মুছতে-যাওয়া ডকুমেন্টগুলো JSON ব্যাকআপ হিসেবে ফাইলে সেভ হয়।
// - কাজ শেষে এই ফাইলটি মুছে ফেলতে পারেন।
import "dotenv/config";
import fs from "node:fs";
import mongoose from "mongoose";
import Package from "../models/Package.js";
import Purchase from "../models/Purchase.js";
import { ECOMMERCE_CATEGORY } from "../lib/ecmsPlans.js";

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set in server/.env");
    process.exit(1);
  }
  const confirm = process.argv.includes("--confirm");

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME || undefined,
  });

  // soft-deleted (Trash-এ থাকা) গুলোও ধরা হয়
  const old = await Package.find({ category: ECOMMERCE_CATEGORY }).lean();
  console.log(`"${ECOMMERCE_CATEGORY}" ক্যাটাগরির পুরোনো প্যাকেজ: ${old.length}টি`);
  for (const p of old) {
    const used = await Purchase.countDocuments({ packageId: p._id });
    console.log(` - ${p.name} (${p._id}) | অর্ডার আছে: ${used}টি${p.deletedAt ? " | Trash-এ ছিল" : ""}`);
  }

  if (old.length === 0) {
    console.log("মোছার মতো কিছু নেই।");
  } else if (!confirm) {
    console.log("\nএটা শুধু প্রিভিউ — কিছু মোছা হয়নি। সত্যিই মুছতে --confirm যোগ করে আবার চালান।");
  } else {
    const backup = `old-ecommerce-packages-backup-${Date.now()}.json`;
    fs.writeFileSync(backup, JSON.stringify(old, null, 2));
    console.log(`\nব্যাকআপ সেভ হয়েছে: ${backup}`);
    const res = await Package.deleteMany({ _id: { $in: old.map((p) => p._id) } });
    console.log(`মোছা হয়েছে: ${res.deletedCount}টি`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
