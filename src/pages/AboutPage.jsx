import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import { trustItemIcons } from '../data/siteData'
import useSiteSettings from '../lib/useSiteSettings'
import { useLanguage } from '../i18n/LanguageContext'

export default function AboutPage() {
  const { settings } = useSiteSettings()
  const founder = settings?.founder
  const { t, tList } = useLanguage()
  const aboutStats = tList('data.aboutStats')
  const whyUs = tList('data.whyUs')
  const trustItems = tList('data.trustItems')

  return (
    <div className="bg-brand-50 min-h-screen">
      <Seo
        title={t('about.seoTitle')}
        description={t('about.seoDescription')}
      />
      <PageHero
        eyebrow={t('about.hero.eyebrow')}
        title={t('about.hero.title')}
        text={`${t('brand.tagline')} — ${t('about.hero.textSuffix')}`}
      />

      {/* Stats */}
      <section className="py-10">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-brand-100 bg-white p-6 text-center shadow-lg">
                <strong className="block text-3xl font-bold text-brand-600">{stat.value}</strong>
                <span className="mt-1 block text-sm font-semibold text-slate-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{t('about.story.eyebrow')}</span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">{t('about.story.title')}</h2>
            <p className="mt-4 leading-8 text-slate-600">
              {t('about.story.paragraph1')}
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              {t('about.story.paragraph2')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services">{t('about.story.ctaServices')} <ArrowRight size={16} /></Button>
              <Button href="/contact" variant="ghost-dark">{t('about.story.ctaContact')}</Button>
            </div>
          </div>

          {/* Mission/Vision */}
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-brand-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🎯</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{t('about.mission.title')}</h3>
              <p className="mt-2 leading-7 text-slate-600">{t('about.mission.text')}</p>
            </div>
            <div className="rounded-[2rem] border border-brand-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🌟</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{t('about.vision.title')}</h3>
              <p className="mt-2 leading-7 text-slate-600">{t('about.vision.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('about.whyUs.eyebrow')} title={t('about.whyUs.title')} text={t('about.whyUs.text')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-brand-50 p-6 shadow-lg transition hover:shadow-xl">
                <CheckCircle2 className="text-brand-600" size={26} />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow={t('about.trust.eyebrow')} title={t('about.trust.title')} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((title, i) => {
              const Icon = trustItemIcons[i]
              return (
                <div key={title} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg transition hover:shadow-xl">
                  <Icon className="text-brand-600" size={22} />
                  <span>{title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Owner brief */}
      {founder?.name && (
        <section className="py-8 pb-16 bg-white">
          <div className="mx-auto w-[min(900px,calc(100%-40px))]">
            <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-8 text-center shadow-xl">
              <Avatar
                name={founder.name}
                photo={founder.photoUrl}
                size="h-20 w-20"
                iconSize={24}
                className="mx-auto border-4 border-white shadow-lg shadow-brand-900/10"
              />
              <h3 className="mt-4 text-2xl font-medium text-slate-900">{founder.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-600">{founder.role}{t('about.founder.roleSuffix')}</p>
              <p className="mt-4 mx-auto max-w-lg leading-7 text-slate-600">"{founder.bio}"</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/team">{t('about.founder.ctaTeam')} <ArrowRight size={16} /></Button>
                <Button href="/contact" variant="ghost-dark">{t('about.founder.ctaContact')}</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
