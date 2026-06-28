import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/siteData'
import Button from '../components/Button'
import { ArrowRight } from 'lucide-react'

export default function PortfolioPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Project Showcase</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Our Work</h1>
          <p className="mt-4 text-lg text-slate-300">Live websites we have built for clients — click any card to visit the live project.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item) => (
              <a key={item.title} href={item.url} target="_blank" rel="noreferrer"
                className="group overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden border-b border-slate-200 bg-slate-100">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">Visit Website</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{item.category}</span>
                  <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{item.text}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600">Like what you see? Let's build something great together.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Start Your Project <ArrowRight size={16} /></Button>
              <Button href="/pricing" variant="ghost-dark">See Pricing</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
