import { Clock3, Globe2, Mail, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import { brand } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

const contactItem =
  "group flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:shadow-black/20 dark:hover:border-brand-800/40 dark:hover:text-brand-400";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-50 py-8 text-slate-950 dark:bg-slate-900 dark:text-white lg:py-12" id="contact">
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        <SectionHeader
          align="center"
          eyebrow={t("home.contact.eyebrow")}
          title={t("home.contact.title")}
          text={t("home.contact.text")}
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <div className="grid gap-3">
              <a className={contactItem} href={brand.phoneHref}>
                <PhoneCall size={18} />
                <span>{brand.phone}</span>
              </a>

              <a className={contactItem} href={brand.emailHref}>
                <Mail size={18} />
                <span>{brand.email}</span>
              </a>

              <a
                className={contactItem}
                href={brand.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 size={18} />
                <span>{t("home.contact.viewFacebook")}</span>
              </a>

              <div className={contactItem}>
                <MapPin size={18} />
                <span>{t("brand.location")}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-brand-50/70 px-4 py-3 text-sm font-medium text-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                <Clock3 size={18} className="shrink-0 text-brand-600 dark:text-brand-400" />
                <span>{t("home.contact.replyTime")}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50/70 px-4 py-3 text-sm font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{t("home.contact.freeConsult")}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ContactForm className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
