import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import PricingCard from "../components/PricingCard";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { SkeletonCard } from "../components/Skeleton";
import { apiGet } from "../lib/api";

export default function PricingPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/public/packages")
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  const grouped = packages.reduce((acc, pkg) => {
    acc[pkg.category] = acc[pkg.category] || [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {});

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title="প্যাকেজ ও মূল্য"
        description="বাংলাদেশে ওয়েবসাইট, ই-কমার্স স্টোর, মাদরাসা ম্যানেজমেন্ট সিস্টেম এবং ডোমেইন/হোস্টিং সাপোর্টের জন্য সাশ্রয়ী মূল্য।"
      />
      <PageHero
        eyebrow="প্যাকেজ"
        title="প্রফেশনাল সার্ভিস প্যাকেজ"
        text="ওয়েবসাইট, ই-কমার্স স্টোর, মাদরাসা ম্যানেজমেন্ট সিস্টেম এবং ডোমেইন/হোস্টিং সাপোর্টের জন্য সাশ্রয়ী মূল্য।"
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          {loading ? (
            <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">এখনো কোনো প্যাকেজ যোগ করা হয়নি। শীঘ্রই আসছে।</p>
          ) : (
            <div className="grid gap-14">
              {Object.entries(grouped).map(([category, plans]) => (
                <div key={category}>
                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">{category}</h3>
                  <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                      <PricingCard
                        key={plan._id}
                        plan={{
                          ...plan,
                          price: plan.priceLabel || `৳${plan.priceAmount.toLocaleString("bn-BD")}`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-white text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-2xl font-bold text-slate-900">কোন প্যাকেজ নিবেন বুঝতে পারছেন না?</h2>
          <p className="mt-3 text-slate-600">WhatsApp-এ যোগাযোগ করুন, আমরা আপনার প্রয়োজন অনুযায়ী সেরা অপশন সাজেস্ট করব।</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">এখনই যোগাযোগ করুন</Button>
            <Button href="/services" variant="ghost-dark">সব সার্ভিস দেখুন</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
