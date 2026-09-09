import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import Button from "../components/Button";
import { brand } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t, tList } = useLanguage();
  const aboutStats = tList("data.aboutStats");
  const previewItems = tList("home.hero.previewItems");
  const highlightItems = tList("home.hero.highlightItems");

  return (
    <section className="relative overflow-hidden bg-hero-light pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-24" id="home">
      <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600 shadow-sm shadow-brand-900/5 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
            <CheckCircle2 size={16} className="shrink-0 sm:hidden" />
            <CheckCircle2 size={18} className="hidden shrink-0 sm:block" />
            {t("home.hero.badge")}
          </span>
          <h1 className="mt-5 max-w-2xl text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl sm:leading-[1.3] lg:text-[2.65rem] lg:leading-[1.2]">
            <span className="block text-brand-600">{t("home.hero.titleLine1")} </span>
            <span className="block text-emerald-600">{t("home.hero.titleLine2")} </span>
            <span className="block text-blue-600">{t("home.hero.titleLine3")} </span>
            <span className="block text-violet-600">{t("home.hero.titleLine4")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
            {t("home.hero.description").replace("{brand}", brand.name)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">
              {t("home.hero.ctaPrimary")} <ArrowRight size={18} />
            </Button>
            <Button href="/services" variant="ghost-dark">
              <PlayCircle size={18} /> {t("home.hero.ctaSecondary")}
            </Button>
          </div>

          {/* Stats row — real numbers, reused from About page data */}
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200/70 pt-7 dark:border-slate-800 sm:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-[1.75rem]">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/40 lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            {/* Signature multi-color mesh — echoes the headline's brand/emerald/blue/violet palette */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 top-1/3 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative mb-6 flex items-center justify-between gap-3">
              <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">{t("home.hero.previewBadge")}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{t("home.hero.previewTag")}</span>
            </div>
            <h3 className="relative max-w-sm text-lg font-medium leading-snug tracking-[-0.01em] text-slate-900 dark:text-white">
              {t("home.hero.previewTitle")}
            </h3>
            <div className="relative mt-6 grid gap-3">
              {previewItems.map((item, i) => {
                const accent = [
                  { text: "text-brand-600", dot: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400" },
                  { text: "text-emerald-600", dot: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" },
                  { text: "text-blue-600", dot: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
                  { text: "text-violet-600", dot: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400" },
                ][i % 4];
                return (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 transition hover:border-slate-200 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${accent.dot}`}>
                      <CheckCircle2 size={14} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {highlightItems.map((item) => (
              <div key={item} className="rounded-2xl border border-brand-100 bg-brand-50 p-4 transition hover:border-brand-200 hover:bg-brand-100/60 dark:border-brand-800/40 dark:bg-brand-500/10 dark:hover:bg-brand-500/20">
                <span className="text-sm font-medium text-brand-700 dark:text-brand-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
