import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import FadeImage from "../components/FadeImage";
import { apiGet } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    apiGet("/public/portfolio")
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section className="bg-brand-50 py-8 dark:bg-slate-900 lg:py-12" id="portfolio">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow={t("home.portfolio.eyebrow")}
          title={t("home.portfolio.title")}
          text={t("home.portfolio.text")}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              key={item._id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800 dark:shadow-black/20 dark:hover:border-brand-800/40"
            >
              <div className="relative aspect-video overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                {item.imageUrl && (
                  <FadeImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                    {t("home.portfolio.viewWebsite")}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">{item.category}</span>

                <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-400">{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
