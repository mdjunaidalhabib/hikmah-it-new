import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { portfolio } from '../data/siteData'
import Button from '../components/Button'
import { ArrowRight } from 'lucide-react'

export default function PortfolioPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="Portfolio & Live Projects"
        description="Browse live websites Hikmah IT has built for clients — e-commerce stores, business websites and landing pages."
      />
      <PageHero
        eyebrow="Project Showcase"
        title="Our Work"
        text="Live websites we have built for clients — click any card to visit the live project."
      />

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
                  <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900">{item.title}</h3>
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
