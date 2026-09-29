import { ArrowRight, Check, ExternalLink, Zap } from "lucide-react";
import Button from "../components/Button";
import { smsLinks } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

export default function SmsHighlight() {
  const { t, tList } = useLanguage();
  const points = tList("smsPage.home.points");

  return (
    <section className="bg-white py-8 dark:bg-slate-950 lg:py-12" id="quick-sms">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-amber-50 p-7 shadow-xl shadow-brand-950/5 dark:border-brand-800/40 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/40 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/20 dark:text-brand-400">
                <Zap size={13} /> {t("smsPage.home.eyebrow")}
              </span>
              <h2 className="mt-3.5 text-xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-2xl lg:text-[2.1rem]">
                {t("smsPage.home.title")}
              </h2>
              <p className="mt-3.5 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                {t("smsPage.home.text")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/sms">
                  {t("smsPage.home.cta")} <ArrowRight size={16} />
                </Button>
                <Button href={smsLinks.register} variant="ghost-dark" rel="noopener">
                  {t("smsPage.home.ctaSecondary")} <ExternalLink size={15} />
                </Button>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {points.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-slate-200"
                >
                  <Check size={16} className="text-brand-600 dark:text-brand-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
