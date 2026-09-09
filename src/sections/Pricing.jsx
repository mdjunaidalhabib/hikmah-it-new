import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import PricingCard from "../components/PricingCard";
import { apiGet } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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

  if (!loading && packages.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-brand-50 py-8 dark:bg-slate-900 lg:py-12" id="pricing">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow={t("home.pricing.eyebrow")}
          title={t("home.pricing.title")}
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">{t("common.loading")}</p>
        ) : (
          <div className="grid gap-12">
            {Object.entries(grouped).map(([category, plans]) => (
              <div key={category}>
                <h3 className="mb-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {category}
                </h3>

                <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
                  {plans.map((plan) => (
                    <PricingCard key={plan._id} plan={plan} />
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
