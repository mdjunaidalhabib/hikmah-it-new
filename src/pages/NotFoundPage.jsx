import { ArrowRight, Home } from 'lucide-react'
import Button from '../components/Button'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-[#edf4ff] px-6 py-16 text-center">
      <Seo title="পেজ পাওয়া যায়নি" description="আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরিয়ে নেওয়া হয়েছে।" />
      <div>
        <span className="text-7xl font-bold text-blue-600">৪০৪</span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-3 max-w-md text-slate-600">
          আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরিয়ে নেওয়া হয়েছে।
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home size={16} /> হোমপেজে ফিরুন
          </Button>
          <Button href="/contact" variant="ghost-dark">
            যোগাযোগ করুন <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
