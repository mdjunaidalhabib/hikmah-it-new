// One-time backfill for the Services + Team-founder migration off siteData.js hardcoding.
// Run once from server/: node src/scripts/seedServicesAndFounder.js
// Safe to re-run (idempotent). Delete this file once you've confirmed the data landed in the admin UI.
import "dotenv/config";
import mongoose from "mongoose";
import Service from "../models/Service.js";
import SiteSettings from "../models/SiteSettings.js";

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set in server/.env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      {
        title: "ফুল ই-কমার্স ওয়েবসাইট",
        text: "প্রোডাক্ট, অর্ডার, কাস্টমার, পেমেন্ট, ডেলিভারি এবং রিপোর্টিং সিস্টেম সহ ক্লিন অ্যাডমিন প্যানেল।",
        iconName: "ShoppingBag",
        href: "/ecommerce",
        sortOrder: 0,
      },
      {
        title: "মাদরাসা ম্যানেজমেন্ট সিস্টেম",
        text: "স্টুডেন্ট, টিচার, অ্যাকাউন্টিং, অ্যাটেন্ডেন্স, ফি, রেজাল্ট, নোটিশ এবং পাবলিক ওয়েবসাইট কন্ট্রোল সিস্টেম।",
        iconName: "School",
        href: "/madrasah",
        sortOrder: 1,
      },
      {
        title: "বিজনেস ওয়েবসাইট",
        text: "কোম্পানি ওয়েবসাইট, সার্ভিস ওয়েবসাইট, পোর্টফোলিও ওয়েবসাইট এবং লিডের জন্য সিঙ্গেল পেজ ল্যান্ডিং ওয়েবসাইট।",
        iconName: "Building2",
        href: "/business",
        sortOrder: 2,
      },
      {
        title: "পোর্টফোলিও ওয়েবসাইট",
        text: "পার্সোনাল ব্র্যান্ড, এজেন্সি, প্রফেশনাল প্রোফাইল এবং শক্তিশালী ভিজ্যুয়াল লেআউট সহ কাজের শোকেস ওয়েবসাইট।",
        iconName: "MonitorSmartphone",
        href: "/business",
        sortOrder: 3,
      },
      {
        title: "ল্যান্ডিং পেজ ওয়েবসাইট",
        text: "প্রোডাক্ট, কোর্স, ইভেন্ট বা সার্ভিস প্রমোশনের জন্য WhatsApp CTA সহ সিঙ্গেল পেজ ক্যাম্পেইন ওয়েবসাইট।",
        iconName: "Rocket",
        href: "/business",
        sortOrder: 4,
      },
      {
        title: "হোস্টিং ও ডোমেইন সার্ভিস",
        text: "ডোমেইন সাপোর্ট এবং ইন্টারন্যাশনাল হোস্টিং কেনা/পেমেন্ট/সেটআপ সাপোর্ট; আমরা নিজস্ব হোস্টিং বিক্রি করি না।",
        iconName: "ServerCog",
        href: "/hosting",
        sortOrder: 5,
      },
    ]);
    console.log("Seeded 6 services");
  } else {
    console.log("Services already exist, skipping");
  }

  const settings = await SiteSettings.getSingleton();
  if (!settings.founder?.name) {
    settings.founder = {
      name: "Md Junaid Al Habib",
      role: "প্রতিষ্ঠাতা ও সিইও",
      location: "দেওয়ানগঞ্জ, জামালপুর",
      bio: "ব্যবসা ও শিক্ষা প্রতিষ্ঠানের জন্য আধুনিক ওয়েবসাইট, ই-কমার্স প্ল্যাটফর্ম এবং ম্যানেজমেন্ট সিস্টেম তৈরিতে ৩+ বছরের অভিজ্ঞতা সম্পন্ন একজন প্যাশনেট ওয়েব ডেভেলপার ও উদ্যোক্তা।",
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "UI/UX", "SEO"],
      photoUrl: "/team/junaid.jpeg",
      facebook: "https://www.facebook.com/share/1Biz9s6ueR",
      whatsapp: "https://wa.me/8801624114405",
    };
    await settings.save();
    console.log("Seeded founder profile");
  } else {
    console.log("Founder profile already set, skipping");
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
