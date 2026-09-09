import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { ServiceCard } from "../components/Card";
import { SkeletonCard } from "../components/Skeleton";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";
import { apiGet } from "../lib/api";
import { SERVICE_ICONS, DEFAULT_SERVICE_ICON } from "../lib/serviceIcons";
import { useLanguage } from "../i18n/LanguageContext";

export default function ServicesPage() {
  const { t, tList } = useLanguage();
  const workProcess = tList("data.workProcess");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/public/services")
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo
        title={t("servicesPage.seo.title")}
        description={t("servicesPage.seo.description")}
      />
      <PageHero
        eyebrow={t("servicesPage.hero.eyebrow")}
        title={t("servicesPage.hero.title")}
        text={t("servicesPage.hero.text")}
      />

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow={t("servicesPage.grid.eyebrow")}
            title={t("servicesPage.grid.title")}
            text={t("servicesPage.grid.text")}
          />
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">{t("servicesPage.grid.empty")}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  text={service.text}
                  href={service.href}
                  icon={SERVICE_ICONS[service.iconName] || SERVICE_ICONS[DEFAULT_SERVICE_ICON]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-8 lg:py-12 bg-white dark:bg-slate-900">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t("servicesPage.process.eyebrow")} title={t("servicesPage.process.title")} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((item) => (
              <article key={item.step} className="rounded-3xl border border-slate-200 bg-brand-50 p-6 shadow-lg shadow-slate-950/5 transition hover:shadow-xl dark:border-slate-800 dark:bg-brand-500/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 font-bold text-white">{item.step}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("servicesPage.cta.title")}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t("servicesPage.cta.text")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">{t("servicesPage.cta.primary")} <ArrowRight size={16} /></Button>
            <Button href="/pricing" variant="ghost-dark">{t("servicesPage.cta.secondary")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
