import { ArrowRight, MessageCircle, TrendingUp, CheckCircle, Zap, Users, DollarSign, Star } from "lucide-react";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { brand, joinRoleIcons } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

const perkIcons = [DollarSign, Users, Zap, Star, TrendingUp, CheckCircle];

export default function EarnPage() {
  const { t, tList } = useLanguage();

  const steps = tList("earnPage.steps");
  const perks = tList("earnPage.perks");
  const heroStats = tList("earnPage.hero.stats");
  const joinRoles = tList("data.joinRoles");

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-slate-900">
      <Seo
        title={t("earnPage.seoTitle")}
        description={t("earnPage.seoDescription")}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero-light py-10">
        <div className="absolute inset-0 opacity-70 bg-grid-overlay" />

        {/* floating glow blobs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-10 h-48 w-48 rounded-full bg-emerald-300/15 blur-2xl" />

        <div className="relative mx-auto w-[min(820px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 backdrop-blur dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
            💰 {t("earnPage.hero.badge")}
          </span>

          <h1 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            {t("earnPage.hero.titlePart1")}{" "}
            <span className="bg-gradient-to-r from-brand-600 to-emerald-500 bg-clip-text text-transparent">
              {t("earnPage.hero.titlePart2")}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {t("earnPage.hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>
              <MessageCircle size={16} />
              {t("earnPage.hero.joinNowBtn")}
            </Button>
            <Button href="/contact" variant="ghost-dark">
              {t("earnPage.hero.learnMoreBtn")}
              <ArrowRight size={16} />
            </Button>
          </div>

          {/* Quick stat strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 uppercase tracking-widest dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Earn with us ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-600 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
              {t("earnPage.why.eyebrow")}
            </span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t("earnPage.why.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {perks.map((label, i) => {
              const Icon = perkIcons[i];
              return (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-brand-800/40 dark:bg-slate-800"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md shadow-brand-900/20">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm font-semibold leading-tight text-slate-700 dark:text-slate-200">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partner Tiers ─ */}
      <section className="bg-white py-14 lg:py-20 dark:bg-slate-900">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-600 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
              {t("earnPage.tiers.eyebrow")}
            </span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t("earnPage.tiers.heading")}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500 dark:text-slate-400">
              {t("earnPage.tiers.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {joinRoles.map((role, i) => (
              <article
                key={role.role}
                className={`relative overflow-hidden rounded-[2rem] border p-8 transition hover:-translate-y-1 hover:shadow-2xl ${
                  i === 1
                    ? "border-brand-500 bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-xl shadow-brand-900/20"
                    : "border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-800"
                }`}
              >
                {i === 1 && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                    {t("earnPage.tiers.mostPopular")}
                  </span>
                )}

                <div className="text-4xl">{joinRoleIcons[i]}</div>

                <h3 className={`mt-4 text-xl font-medium ${i === 1 ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {role.role}
                </h3>

                <p className={`mt-3 leading-7 text-sm ${i === 1 ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                  {role.desc}
                </p>

                <div
                  className={`mt-6 rounded-xl border px-4 py-3 ${
                    i === 1 ? "border-brand-400/40 bg-brand-500/25" : "border-brand-100 bg-brand-50 dark:border-brand-800/40 dark:bg-brand-500/10"
                  }`}
                >
                  <p className={`text-sm font-bold ${i === 1 ? "text-brand-200" : "text-brand-700 dark:text-brand-400"}`}>
                    💰 {role.earn}
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    href={brand.whatsapp}
                    variant={i === 1 ? "ghost" : "ghost-dark"}
                  >
                    {t("earnPage.tiers.joinBtn")}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto w-[min(900px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-600 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
              {t("earnPage.how.eyebrow")}
            </span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t("earnPage.how.heading")}
            </h2>
          </div>

          <div className="relative space-y-4">
            {/* vertical line */}
            <div className="absolute left-[28px] top-10 h-[calc(100%-80px)] w-px bg-brand-200 lg:left-1/2 lg:-translate-x-px hidden sm:block dark:bg-brand-800/40" />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md lg:w-[calc(50%-28px)] dark:border-slate-800 dark:bg-slate-800 dark:hover:border-brand-800/40 ${
                  i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-sm font-bold text-white shadow-md shadow-brand-900/20">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16 text-center lg:py-20 dark:bg-slate-900">
        <div className="mx-auto w-[min(700px,calc(100%-40px))]">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
            🚀 {t("earnPage.cta.badge")}
          </span>

          <h2 className="mt-5 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            {t("earnPage.cta.heading")}
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            {t("earnPage.cta.text")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>
              <MessageCircle size={16} />
              {t("earnPage.cta.whatsappJoinBtn")}
            </Button>
            <Button href="/contact" variant="ghost-dark">
              {t("earnPage.cta.contactBtn")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
