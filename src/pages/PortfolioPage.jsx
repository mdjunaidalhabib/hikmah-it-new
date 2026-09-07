import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { Skeleton } from "../components/Skeleton";
import FadeImage from "../components/FadeImage";
import { apiGet } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    apiGet("/public/portfolio")
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title={t("portfolioPage.seo.title")}
        description={t("portfolioPage.seo.description")}
      />
      <PageHero
        eyebrow={t("portfolioPage.hero.eyebrow")}
        title={t("portfolioPage.hero.title")}
        text={t("portfolioPage.hero.text")}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white">
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <div className="p-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="mt-2 h-5 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">{t("portfolioPage.empty")}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <a
                  key={item._id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-slate-200 bg-slate-100">
                    {item.imageUrl && (
                      <FadeImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">{t("portfolioPage.viewWebsite")}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{item.category}</span>
                    <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-slate-600">{t("portfolioPage.bottom.text")}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button href="/contact">{t("portfolioPage.bottom.startProject")} <ArrowRight size={16} /></Button>
              <Button href="/pricing" variant="ghost-dark">{t("portfolioPage.bottom.viewPackages")}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
