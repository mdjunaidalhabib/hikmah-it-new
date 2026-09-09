import SectionHeader from "../components/SectionHeader";
import { trustItemIcons } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

export default function Trust() {
  const { t, tList } = useLanguage();
  const trustItems = tList("data.trustItems");

  return (
    <section className="bg-brand-50 py-8 dark:bg-slate-900 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow={t("home.trust.eyebrow")}
          title={t("home.trust.title")}
          text={t("home.trust.text")}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((title, i) => {
            const Icon = trustItemIcons[i];
            return (
              <div
                key={title}
                className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:shadow-black/20 dark:hover:border-brand-800/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-4 ring-brand-50/50 transition duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/10">
                  <Icon size={22} />
                </span>
                <span>{title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
