import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { brand } from '../data/siteData'
import useSiteSettings from '../lib/useSiteSettings'
import { useLanguage } from '../i18n/LanguageContext'

export default function TermsOfServicePage() {
  const { settings } = useSiteSettings()
  const { t, tList } = useLanguage()
  const email = settings?.email || brand.email
  const emailHref = settings?.email ? `mailto:${settings.email}` : brand.emailHref
  const phone = settings?.phone || brand.phone

  const s = (key, fallback) => t(`termsOfServicePage.sections.${key}`, fallback)
  const sl = (key) => tList(`termsOfServicePage.sections.${key}`)

  const sections = [
    {
      key: 's1',
      title: s('s1.title'),
      body: <p>{s('s1.text')}</p>,
    },
    {
      key: 's2',
      title: s('s2.title'),
      body: <p>{s('s2.text')}</p>,
    },
    {
      key: 's3',
      title: s('s3.title'),
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {sl('s3.items').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      key: 's4',
      title: s('s4.title'),
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {sl('s4.items').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      key: 's5',
      title: s('s5.title'),
      body: <p>{s('s5.text')}</p>,
    },
    {
      key: 's6',
      title: s('s6.title'),
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {sl('s6.items').map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      key: 's7',
      title: s('s7.title'),
      body: <p>{s('s7.text')}</p>,
    },
    {
      key: 's8',
      title: s('s8.title'),
      body: <p>{s('s8.text')}</p>,
    },
    {
      key: 's9',
      title: s('s9.title'),
      body: <p>{s('s9.text')}</p>,
    },
    {
      key: 's10',
      title: s('s10.title'),
      body: <p>{s('s10.text')}</p>,
    },
    {
      key: 's11',
      title: s('s11.title'),
      body: <p>{s('s11.text')}</p>,
    },
    {
      key: 's12',
      title: s('s12.title'),
      body: <p>{s('s12.text')}</p>,
    },
  ]

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title={t('termsOfServicePage.seoTitle')}
        description={t('termsOfServicePage.seoDescription')}
      />
      <PageHero
        eyebrow={t('termsOfServicePage.eyebrow')}
        title={t('termsOfServicePage.title')}
        text={`${t('termsOfServicePage.lastUpdatedLabel')} ${t('termsOfServicePage.lastUpdated')}`}
      />

      <section className="py-10 lg:py-14">
        <div className="mx-auto w-[min(880px,calc(100%-40px))]">
          <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl sm:p-10">
            <div className="space-y-9">
              {sections.map((section) => (
                <div key={section.key}>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{section.title}</h2>
                  <div className="mt-3 space-y-3 leading-8 text-slate-600">{section.body}</div>
                </div>
              ))}

              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{s('contact.title')}</h2>
                <div className="mt-3 space-y-1 leading-8 text-slate-600">
                  <p>{s('contact.intro')}</p>
                  <p>
                    {s('contact.emailLabel')} <a href={emailHref} className="font-semibold text-brand-700 hover:underline">{email}</a>
                  </p>
                  <p>{s('contact.phoneLabel')} <span className="font-semibold text-slate-800">{phone}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
