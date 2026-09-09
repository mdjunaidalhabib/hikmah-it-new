import { Globe2, Mail, MapPin, PhoneCall } from 'lucide-react'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { brand } from '../data/siteData'
import useSiteSettings from '../lib/useSiteSettings'
import { useLanguage } from '../i18n/LanguageContext'

const contactItem = "flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-brand-300 hover:text-brand-700 dark:border-brand-800/40 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:text-brand-400"

export default function ContactPage() {
  const { settings } = useSiteSettings()
  const { t } = useLanguage()
  const phone = settings?.phone || brand.phone
  const phoneHref = settings?.phone ? `tel:+88${settings.phone.replace(/\D/g, "")}` : brand.phoneHref
  const email = settings?.email || brand.email
  const emailHref = settings?.email ? `mailto:${settings.email}` : brand.emailHref
  const location = settings?.location || t("brand.location")
  const facebook = settings?.facebook || brand.facebook
  const whatsapp = settings?.whatsapp || brand.whatsapp

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo
        title={t("contactPage.seo.title")}
        description={t("contactPage.seo.description")}
      />
      <PageHero
        eyebrow={t("contactPage.hero.eyebrow")}
        title={t("contactPage.hero.title")}
        text={t("contactPage.hero.text")}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1100px,calc(100%-40px))] items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{t("contactPage.heading")}</h2>
            <div className="grid gap-3">
              <a className={contactItem} href={phoneHref}><PhoneCall size={18} /><span>{phone}</span></a>
              <a className={contactItem} href={emailHref}><Mail size={18} /><span>{email}</span></a>
              <a className={contactItem} href={facebook} target="_blank" rel="noreferrer"><Globe2 size={18} /><span>{t("contactPage.viewFacebook")}</span></a>
              <div className={contactItem}><MapPin size={18} /><span>{location}</span></div>
            </div>

            <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-lg dark:border-brand-800/40 dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-white">{t("contactPage.responseTime.title")}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{t("contactPage.responseTime.text")}</p>
              <div className="mt-4">
                <Button href={whatsapp}>{t("contactPage.whatsappCta")}</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <h3 className="w-full max-w-md text-xl font-bold text-slate-900 dark:text-white">{t("contactPage.sendMessage")}</h3>
            <ContactForm className="w-full max-w-md" />
          </div>
        </div>
      </section>
    </div>
  )
}
