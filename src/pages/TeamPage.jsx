import { useEffect, useState } from "react";
import { ExternalLink, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { Skeleton, SkeletonCard } from "../components/Skeleton";
import Avatar from "../components/Avatar";
import { joinRoleIcons, brand } from "../data/siteData";
import { apiGet } from "../lib/api";
import useSiteSettings from "../lib/useSiteSettings";
import { useLanguage } from "../i18n/LanguageContext";

export default function TeamPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings, loading: settingsLoading } = useSiteSettings();
  const founder = settings?.founder;
  const { t, tList } = useLanguage();
  const joinRoles = tList("data.joinRoles");

  useEffect(() => {
    apiGet("/public/partners")
      .then(setPartners)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-slate-900">
      <Seo
        title={t("team.seoTitle")}
        description={t("team.seoDescription")}
      />
      <PageHero
        eyebrow={t("team.hero.eyebrow")}
        title={t("team.hero.title")}
        text={t("team.hero.text")}
      />

      {/* Owner */}
      {settingsLoading ? (
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-[min(900px,calc(100%-40px))]">
            <div className="rounded-[2rem] border border-brand-200 bg-white p-8 shadow-2xl shadow-brand-950/10 dark:border-brand-800/40 dark:bg-slate-900">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <Skeleton className="h-28 w-28 shrink-0 rounded-full" />
                <div className="w-full text-center sm:text-left">
                  <Skeleton className="mx-auto h-6 w-24 rounded-full sm:mx-0" />
                  <Skeleton className="mx-auto mt-3 h-7 w-48 sm:mx-0" />
                  <Skeleton className="mx-auto mt-2 h-4 w-32 sm:mx-0" />
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : founder?.name ? (
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-[min(900px,calc(100%-40px))]">
            <div className="rounded-[2rem] border border-brand-200 bg-white p-8 shadow-2xl shadow-brand-950/10 dark:border-brand-800/40 dark:bg-slate-900">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <Avatar
                  name={founder.name}
                  photo={founder.photoUrl}
                  size="h-28 w-28"
                  iconSize={32}
                  className="border-4 border-white shadow-lg shadow-brand-900/10 dark:border-slate-900"
                />

                <div className="text-center sm:text-left">
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                    {founder.role}
                  </span>

                  <h2 className="mt-2 text-2xl font-medium text-slate-900 dark:text-white">{founder.name}</h2>

                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400 sm:justify-start">
                    <MapPin size={14} />
                    {founder.location}
                  </p>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{founder.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(founder.skills || []).map((skill) => (
                      <span key={skill} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button href={founder.whatsapp}>
                      <MessageCircle size={16} />
                      {t("team.owner.whatsappButton")}
                    </Button>

                    <Button href={founder.facebook} variant="ghost-dark">
                      <ExternalLink size={16} />
                      {t("team.owner.facebookButton")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Marketing Partners */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow={t("team.partners.eyebrow")}
            title={t("team.partners.title")}
            text={t("team.partners.text")}
          />

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : partners.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">{t("team.partners.empty")}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((member) => (
                <article
                  key={member._id}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <Avatar
                    name={member.name}
                    photo={member.photoUrl}
                    className="mx-auto border-4 border-white shadow-lg shadow-brand-900/10 dark:border-slate-900"
                  />

                  <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>

                  <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">{member.role}</p>

                  {member.location && (
                    <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={12} />
                      {member.location}
                    </p>
                  )}

                  {member.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.earningText && (
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 dark:border-emerald-800/40 dark:bg-emerald-500/10">
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">💰 {t("team.partners.totalEarnings")}: {member.earningText}</span>
                    </div>
                  )}

                  <div className="mt-4 flex justify-center gap-3">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("team.partners.facebookAria").replace("{name}", member.name)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}

                    {member.whatsapp && (
                      <a
                        href={member.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("team.partners.whatsappAria").replace("{name}", member.name)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                      >
                        <MessageCircle size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Earn Through Referrals */}
      <section className="bg-white py-12 lg:py-16 dark:bg-slate-900">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
              {t("team.referral.badge")}
            </span>

            <h2 className="mt-4 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              {t("team.referral.title")}
            </h2>

            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">{t("team.referral.text")}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {joinRoles.map((role, i) => (
              <article key={role.role} className="rounded-[2rem] border border-brand-100 bg-brand-50/50 p-7 transition hover:bg-brand-50 dark:border-brand-800/40 dark:bg-brand-500/10 dark:hover:bg-brand-500/20">
                <div className="text-4xl">{joinRoleIcons[i]}</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{role.role}</h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400">{role.desc}</p>

                <div className="mt-5 rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-700 dark:border-brand-800/40 dark:bg-slate-800 dark:text-brand-400">
                  💰 {t("team.referral.commissionLabel")}: {role.earn}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={brand.whatsapp}>
                <MessageCircle size={16} />
                {t("team.referral.joinWhatsapp")}
              </Button>

              <Button href="/contact" variant="ghost-dark">
                {t("team.referral.contactUs")}
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
