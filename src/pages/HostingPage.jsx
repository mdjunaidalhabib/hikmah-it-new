import { Globe2, ServerCog, CheckCircle2, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { brand } from '../data/siteData'
import { useLanguage } from '../i18n/LanguageContext'

const listItem = "flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[15px] leading-6 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"

export default function HostingPage() {
  const { t, tList } = useLanguage()
  const domainItems = tList('hostingPage.domain.items')
  const hostingItems = tList('hostingPage.hosting.items')

  return (
    <div className="bg-brand-50 min-h-screen dark:bg-slate-900">
      <Seo
        title={t('hostingPage.seo.title')}
        description={t('hostingPage.seo.description')}
      />
      <PageHero
        eyebrow={t('hostingPage.hero.eyebrow')}
        title={t('hostingPage.hero.title')}
        text={t('hostingPage.hero.text')}
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">{t('hostingPage.hero.ctaPrimary')} <ArrowRight size={16} /></Button>
          <Button href="/pricing" variant="ghost-dark">{t('hostingPage.hero.ctaSecondary')}</Button>
        </div>
      </PageHero>

      {/* Cards */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Domain */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white"><Globe2 size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-400">{t('hostingPage.domain.badge')}</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{t('hostingPage.domain.title')}</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5 dark:border-brand-800/40 dark:bg-brand-500/10">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('hostingPage.domain.priceLabel')}</p>
                <strong className="mt-1 block text-3xl font-semibold text-brand-700 dark:text-brand-400">{t('hostingPage.domain.price')}</strong>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('hostingPage.domain.priceNote')}</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">{t('hostingPage.domain.desc')}</p>
              <div className="my-5 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                <span>{t('hostingPage.domain.domainPlaceholder')}</span>
                <span className="rounded-full bg-brand-600 px-5 py-2 font-medium text-white">{t('hostingPage.domain.checkButton')}</span>
              </div>
              <ul className="grid gap-3">
                {domainItems.map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" /><span>{item}</span></li>
                ))}
              </ul>
            </article>

            {/* Hosting */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white"><ServerCog size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-400">{t('hostingPage.hosting.badge')}</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{t('hostingPage.hosting.title')}</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-800/40 dark:bg-amber-500/10">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('hostingPage.hosting.priceLabel')}</p>
                <strong className="mt-1 block text-3xl font-semibold text-amber-700 dark:text-amber-400">{t('hostingPage.hosting.price')}</strong>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('hostingPage.hosting.priceNote')}</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">{t('hostingPage.hosting.desc')}</p>
              <ul className="mt-5 grid gap-3">
                {hostingItems.map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" /><span>{item}</span></li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>{t('hostingPage.cta.primary')}</Button>
            <Button href="/contact" variant="ghost-dark">{t('hostingPage.cta.secondary')}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
