import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { madrasahFeatureIcons } from '../data/siteData'
import { apiGet } from '../lib/api'
import { useLanguage } from '../i18n/LanguageContext'

export default function MadrasahPage() {
  const { t, tList } = useLanguage()
  const madrasahFeatures = tList('data.madrasahFeatures')
  const dashboardItems = tList('madrasahPage.dashboard.items')
  const panelItems = tList('madrasahPage.panel.items')
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/public/packages')
      .then((packages) => setPlans(packages.filter((p) => p.category === 'মাদরাসা ম্যানেজমেন্ট সিস্টেম')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title={t('madrasahPage.seo.title')}
        description={t('madrasahPage.seo.description')}
      />
      <PageHero
        eyebrow={t('madrasahPage.hero.eyebrow')}
        title={t('madrasahPage.hero.title')}
        text={t('madrasahPage.hero.text')}
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">{t('madrasahPage.hero.ctaPrimary')} <ArrowRight size={16} /></Button>
          <Button href="/pricing" variant="ghost-dark">{t('madrasahPage.hero.ctaSecondary')}</Button>
        </div>
      </PageHero>

      {/* Dashboard Preview */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-6 shadow-2xl">
            <div className="mb-5 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-600 p-5 text-center text-xl font-semibold text-white">
              {t('madrasahPage.dashboard.title')}
            </div>
            <div className="grid gap-3">
              {dashboardItems.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-brand-100 bg-white px-4 py-4">
                  <span className="font-medium text-slate-700">{item}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">{t('madrasahPage.dashboard.statusActive')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl">
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50 p-5">
                <h3 className="text-lg font-bold text-slate-800">{t('madrasahPage.panel.title')}</h3>
                <p className="mt-1 text-sm text-slate-600">{t('madrasahPage.panel.text')}</p>
              </div>
              <div className="grid gap-3">
                {panelItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Button href="/contact">{t('madrasahPage.panel.cta')}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('madrasahPage.features.eyebrow')} title={t('madrasahPage.features.title')} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {madrasahFeatures.map((f, i) => <FeatureCard key={f.title} {...f} icon={madrasahFeatureIcons[i]} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-12 lg:pb-16 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('madrasahPage.pricing.eyebrow')} title={t('madrasahPage.pricing.title')} />
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-400">{t('common.loading')}</p>
          ) : plans.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">{t('madrasahPage.pricing.empty')}</p>
          ) : (
            <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard key={plan._id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
