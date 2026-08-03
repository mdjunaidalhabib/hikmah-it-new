import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { businessWebsiteTypes, pricingGroups } from '../data/siteData'

const icons = [Rocket, MonitorSmartphone, Globe2]

export default function BusinessPage() {
  const websitePricing = pricingGroups[0]

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="Landing Page, Portfolio & Business Website"
        description="Professional website solutions for personal brand, service business, company profile and campaign-focused online presence."
      />
      <PageHero
        eyebrow="Business Website"
        title="Landing Page, Portfolio & Business Website"
        text="Professional website solutions for personal brand, service business, company profile and campaign-focused online presence."
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Start Your Website <ArrowRight size={16} /></Button>
          <Button href="/portfolio" variant="ghost">See Live Projects</Button>
        </div>
      </PageHero>

      {/* Types */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-10 lg:grid-cols-2">
          <div className="grid gap-4">
            {businessWebsiteTypes.map((item, index) => {
              const Icon = icons[index]
              return (
                <article key={item.title} className="relative flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">{item.title}</h3>
                    <small className="mt-1 inline-block text-xs font-semibold uppercase tracking-wide text-blue-700">{item.tag}</small>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.text}</p>
                  </div>
                  <ArrowRight className="absolute right-5 top-5 text-blue-600" size={20} strokeWidth={2.2} />
                </article>
              )
            })}
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-2xl shadow-blue-950/10">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <strong className="ml-2 text-sm font-semibold tracking-wide text-slate-700">Website Preview</strong>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-white p-7">
              <small className="text-sm font-semibold uppercase tracking-wide text-blue-700">Professional Website</small>
              <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950">Build trust, showcase your work and collect leads</h3>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">Modern layout, service highlights, portfolio area, testimonials and WhatsApp/Facebook contact flow.</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              {["Clean responsive design","Lead focused structure","Domain separate"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <CheckCircle2 size={16} strokeWidth={2.2} /> {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/pricing">See Website Packages</Button>
              <Button href="/portfolio" variant="ghost-dark">View Showcase</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Packages" title="Website pricing packages" />
          <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
            {websitePricing.plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
