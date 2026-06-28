import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { businessWebsiteTypes, pricingGroups } from '../data/siteData'

const icons = [Rocket, MonitorSmartphone, Globe2]

export default function BusinessPage() {
  const websitePricing = pricingGroups[0]

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Business Website</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Landing Page, Portfolio & Business Website
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Professional website solutions for personal brand, service business, company profile and campaign-focused online presence.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Start Your Website <ArrowRight size={16} /></Button>
            <Button href="/portfolio" variant="ghost">See Live Projects</Button>
          </div>
        </div>
      </section>

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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {websitePricing.plans.map((plan) => (
              <article key={plan.name} className={`flex flex-col rounded-[2rem] border p-7 shadow-xl transition hover:shadow-2xl ${plan.highlighted ? 'border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 ring-2 ring-blue-100 lg:-translate-y-2' : 'border-slate-200 bg-white'}`}>
                {plan.highlighted && <span className="mb-4 inline-block w-fit rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900">Recommended</span>}
                <h3 className="text-2xl font-semibold text-slate-900">{plan.name}</h3>
                <strong className="mt-3 block text-3xl font-bold text-blue-600">{plan.price}</strong>
                <p className="mt-3 leading-7 text-slate-600">{plan.text}</p>
                <ul className="my-6 grid gap-3 text-slate-700">
                  {plan.features.map((f) => <li key={f}>✓ {f}</li>)}
                </ul>
                <div className="mt-auto">
                  <Button href="/contact" variant={plan.highlighted ? 'primary' : 'ghost-dark'}>Choose Package</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
