import { ArrowRight, Home } from 'lucide-react'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="grid min-h-[70vh] place-items-center bg-brand-50 px-6 py-16 text-center">
      <Seo title={t('notFoundPage.seoTitle')} description={t('notFoundPage.seoDescription')} />
      <div>
        <span className="text-7xl font-bold text-brand-600">{t('notFoundPage.code')}</span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">{t('notFoundPage.heading')}</h1>
        <p className="mt-3 max-w-md text-slate-600">
          {t('notFoundPage.message')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home size={16} /> {t('notFoundPage.backHomeBtn')}
          </Button>
          <Button href="/contact" variant="ghost-dark">
            {t('notFoundPage.contactBtn')} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
