import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import PricingCard from "../components/PricingCard";
import { apiGet } from "../lib/api";
import useSiteSettings from "../lib/useSiteSettings";
import { isSectionVisible } from "../lib/sectionVisibility";

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = useSiteSettings();

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

  if (!isSectionVisible(settings, "packages")) return null;
  if (!loading && packages.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#edf4ff] py-8 lg:py-12" id="pricing">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="প্যাকেজ"
          title="প্রফেশনাল সার্ভিস প্যাকেজ"
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400">লোড হচ্ছে…</p>
        ) : (
          <div className="grid gap-12">
            {Object.entries(grouped).map(([category, plans]) => (
              <div key={category}>
                <h3 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">
                  {category}
                </h3>

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
  );
}
