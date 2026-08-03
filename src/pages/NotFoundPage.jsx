import { ArrowRight, Home } from 'lucide-react'
import Button from '../components/Button'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-[#edf4ff] px-6 py-16 text-center">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist or may have been moved." />
      <div>
        <span className="text-7xl font-black text-blue-600">404</span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 max-w-md text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home size={16} /> Back to Home
          </Button>
          <Button href="/contact" variant="ghost-dark">
            Contact Us <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
