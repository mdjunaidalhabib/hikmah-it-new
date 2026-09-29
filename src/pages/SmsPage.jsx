import { ArrowRight, BookOpen, Check, ExternalLink } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { smsFeatureIcons, smsStepIcons, smsLinks } from '../data/siteData'
import { useLanguage } from '../i18n/LanguageContext'

const curlSample = `curl -X POST ${smsLinks.apiEndpoint} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "01XXXXXXXXX",
    "message": "Your OTP is 482913"
  }'`

const ext = { rel: 'noopener' }

export default function SmsPage() {
  const { t, tList } = useLanguage()
  const checklist = tList('smsPage.hero.checklist')
  const features = tList('smsPage.features.items')
  const steps = tList('smsPage.how.steps')
  const apiPoints = tList('smsPage.api.points')
  const faq = tList('smsPage.faq.items')

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo title={t('smsPage.seo.title')} description={t('smsPage.seo.description')} />

      {/* Hero */}
      <PageHero
        eyebrow={t('smsPage.hero.badge')}
        title={t('smsPage.hero.title')}
        text={t('smsPage.hero.text')}
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={smsLinks.register} {...ext}>
            {t('smsPage.hero.ctaPrimary')} <ArrowRight size={16} />
          </Button>
          <Button href={smsLinks.docs} variant="ghost-dark" {...ext}>
            <BookOpen size={16} /> {t('smsPage.hero.ctaSecondary')}
          </Button>
        </div>
        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
          {checklist.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-slate-200"
            >
              <Check size={13} className="text-brand-600 dark:text-brand-400" /> {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow={t('smsPage.features.eyebrow')}
            title={t('smsPage.features.title')}
            text={t('smsPage.features.text')}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => <FeatureCard key={f.title} {...f} icon={smsFeatureIcons[i]} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-8 dark:bg-slate-900 lg:py-12">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('smsPage.how.eyebrow')} title={t('smsPage.how.title')} />
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((item, i) => {
              const Icon = smsStepIcons[i]
              return (
                <article
                  key={item.step}
                  className="rounded-3xl border border-slate-200 bg-brand-50 p-6 shadow-lg shadow-slate-950/5 transition hover:shadow-xl dark:border-slate-800 dark:bg-brand-500/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 font-bold text-white">{item.step}</span>
                    {Icon && <Icon size={22} className="text-brand-600 dark:text-brand-400" />}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* API sample */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow={t('smsPage.api.eyebrow')}
              title={t('smsPage.api.title')}
              text={t('smsPage.api.text')}
            />
            <ul className="mb-6 grid gap-2">
              {apiPoints.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span className="text-emerald-600 dark:text-emerald-400">✓</span> {p}
                </li>
              ))}
            </ul>
            <Button href={smsLinks.docs} {...ext}>
              {t('smsPage.api.cta')} <ExternalLink size={15} />
            </Button>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-xs font-semibold text-slate-400">{t('smsPage.api.codeLabel')}</span>
            </div>
            {/* Code stays LTR / monospace in both languages */}
            <pre dir="ltr" className="overflow-x-auto p-5 text-left font-mono text-[13px] leading-6 text-slate-200">
              <code>{curlSample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-white py-8 dark:bg-slate-900 lg:py-12">
        <div className="mx-auto w-[min(760px,calc(100%-40px))] text-center">
          <SectionHeader
            eyebrow={t('smsPage.pricing.eyebrow')}
            title={t('smsPage.pricing.title')}
            text={t('smsPage.pricing.text')}
          />
          <Button href={smsLinks.pricing} variant="ghost-dark" {...ext}>
            {t('smsPage.pricing.cta')} <ExternalLink size={15} />
          </Button>
        </div>
      </section>

      {/* Reseller banner */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-8 text-white shadow-2xl shadow-brand-950/20 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold sm:text-3xl">{t('smsPage.reseller.title')}</h2>
                <p className="mt-3 leading-7 text-white/90">{t('smsPage.reseller.text')}</p>
              </div>
              <Button href={smsLinks.reseller} variant="white" className="shrink-0 !px-6 !py-3 !text-sm" {...ext}>
                {t('smsPage.reseller.cta')} <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-8 dark:bg-slate-900 lg:py-12">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('smsPage.faq.eyebrow')} title={t('smsPage.faq.title')} />
          <div className="mx-auto grid max-w-3xl gap-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition duration-300 hover:border-brand-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800 dark:shadow-black/20 dark:hover:border-brand-800/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold tracking-tight text-slate-950 marker:content-none dark:text-white">
                  <span className="pr-3">{item.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-open:rotate-180 group-open:bg-brand-100 group-open:text-brand-600 dark:bg-slate-700 dark:text-slate-400 dark:group-open:bg-brand-500/20 dark:group-open:text-brand-400">
                    <ArrowRight size={17} className="rotate-90" />
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('smsPage.cta.title')}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t('smsPage.cta.text')}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={smsLinks.register} {...ext}>
              {t('smsPage.cta.primary')} <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="ghost-dark">{t('smsPage.cta.secondary')}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
