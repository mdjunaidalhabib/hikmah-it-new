import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import PricingCard from "../components/PricingCard";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { SkeletonCard } from "../components/Skeleton";
import { apiGet } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

export default function PricingPage() {
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

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo
        title={t("pricingPage.seo.title")}
        description={t("pricingPage.seo.description")}
      />
      <PageHero
        eyebrow={t("pricingPage.hero.eyebrow")}
        title={t("pricingPage.hero.title")}
        text={t("pricingPage.hero.text")}
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
            <p className="py-10 text-center text-sm text-slate-400">{t("pricingPage.empty")}</p>
          ) : (
            <div className="grid gap-14">
              {Object.entries(grouped).map(([category, plans]) => (
                <div key={category}>
                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{category}</h3>
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

      {/* Bottom CTA */}
      <section className="py-12 bg-white text-center dark:bg-slate-900">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("pricingPage.cta.title")}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t("pricingPage.cta.text")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">{t("pricingPage.cta.contact")}</Button>
            <Button href="/services" variant="ghost-dark">{t("pricingPage.cta.services")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
