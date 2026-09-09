import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import PricingCard from '../components/PricingCard'
import Button from '../components/Button'
import { ecommerceFeatureIcons } from '../data/siteData'
import { apiGet } from '../lib/api'
import { useLanguage } from '../i18n/LanguageContext'

export default function EcommercePage() {
  const { t, tList } = useLanguage()
  const ecommerceFeatures = tList('data.ecommerceFeatures')
  const checklist = tList('ecommercePage.hero.checklist')
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/public/packages')
      .then((packages) => setPlans(packages.filter((p) => p.category === 'ই-কমার্স ওয়েবসাইট')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo
        title={t('ecommercePage.seo.title')}
        description={t('ecommercePage.seo.description')}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-light py-10">
        <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
        <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
              {t('ecommercePage.hero.badge')}
            </span>
            <h1 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl dark:text-white">
              {t('ecommercePage.hero.title')}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              {t('ecommercePage.hero.text')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">{t('ecommercePage.hero.ctaPrimary')} <ArrowRight size={16} /></Button>
              <Button href="/pricing" variant="ghost-dark">{t('ecommercePage.hero.ctaSecondary')}</Button>
            </div>
          </div>
          <div className="hidden rounded-[2rem] border border-brand-100 bg-white/80 p-5 shadow-2xl backdrop-blur-xl dark:border-brand-800/40 dark:bg-slate-900/70 lg:block">
            <div className="grid gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-slate-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-slate-200">
                  <span className="text-brand-600 dark:text-brand-400">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('ecommercePage.features.eyebrow')} title={t('ecommercePage.features.title')} text={t('ecommercePage.features.text')} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecommerceFeatures.map((f, i) => <FeatureCard key={f.title} {...f} icon={ecommerceFeatureIcons[i]} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8 lg:py-12 bg-white dark:bg-slate-900">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('ecommercePage.pricing.eyebrow')} title={t('ecommercePage.pricing.title')} />
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-400">{t('common.loading')}</p>
          ) : plans.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">{t('ecommercePage.pricing.empty')}</p>
          ) : (
            <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard key={plan._id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('ecommercePage.cta.title')}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{t('ecommercePage.cta.text')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">{t('ecommercePage.cta.primary')} <ArrowRight size={16} /></Button>
          <Button href="/portfolio" variant="ghost-dark">{t('ecommercePage.cta.secondary')}</Button>
        </div>
      </section>
    </div>
  )
}
