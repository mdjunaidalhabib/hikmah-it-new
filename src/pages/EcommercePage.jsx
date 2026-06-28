import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { ecommerceFeatures, pricingGroups } from '../data/siteData'

export default function EcommercePage() {
  const ecomPricing = pricingGroups[1]

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
              Main Service
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Full E-commerce Website with Powerful Admin Panel
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              A professional online store needs more than a beautiful homepage — product control, order workflow, customer trust, mobile shopping and complete admin management.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">Start Your Store <ArrowRight size={16} /></Button>
              <Button href="/pricing" variant="ghost">See Packages</Button>
            </div>
          </div>
          <div className="hidden rounded-[2rem] border border-blue-300/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl lg:block">
            <div className="grid gap-3">
              {["Product, category and stock management","Order, payment and delivery status","Customer account and order tracking","SEO-ready product pages","Mobile-friendly shopping experience"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-blue-300/15 bg-white/10 px-4 py-3 text-sm font-medium text-slate-100">
                  <span className="text-cyan-300">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Features" title="Everything your online store needs" text="From product upload to order delivery — all controlled from a clean admin panel." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecommerceFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Packages" title="E-commerce pricing packages" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecomPricing.plans.map((plan) => (
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

      {/* CTA */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Ready to launch your online store?</h2>
        <p className="mt-3 text-slate-600">Contact us and we'll build your e-commerce store from scratch.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Get Free Quote <ArrowRight size={16} /></Button>
          <Button href="/portfolio" variant="ghost-dark">See Live Projects</Button>
        </div>
      </section>
    </div>
  )
}
