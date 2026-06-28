import SectionHeader from '../components/SectionHeader'
import { ServiceCard } from '../components/Card'
import { services, process } from '../data/siteData'
import Button from '../components/Button'
import { ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
            What We Offer
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Everything a business or institution needs — from modern websites and online stores to institution management systems and domain/hosting support.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow="All Services"
            title="Digital services that look professional and work practically"
            text="Each service is designed around real business needs: clean UI, responsive layout, conversion-focused pages and admin-ready workflows."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Work Process" title="Simple, clear and project-focused workflow" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="rounded-3xl border border-slate-200 bg-[#edf4ff] p-6 shadow-lg shadow-slate-950/5 transition hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 font-bold text-white">{item.step}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-3xl font-bold text-slate-900">Ready to start your project?</h2>
          <p className="mt-3 text-slate-600">Contact us today and we will guide you to the right package.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Get Free Quote <ArrowRight size={16} /></Button>
            <Button href="/pricing" variant="ghost-dark">See Pricing</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
