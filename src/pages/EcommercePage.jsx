import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Seo from '../components/Seo'
import { FeatureCard } from '../components/Card'
import PricingCard from '../components/PricingCard'
import Button from '../components/Button'
import { ecommerceFeatures, pricingGroups } from '../data/siteData'

export default function EcommercePage() {
  const ecomPricing = pricingGroups[1]

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="E-commerce Website with Admin Panel"
        description="Full-featured e-commerce websites with product, order, payment and delivery management through a clean, powerful admin panel."
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-navy py-10 text-white">
        <div className="absolute inset-0 opacity-15 bg-grid-overlay" />
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
          <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
            {ecomPricing.plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
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
