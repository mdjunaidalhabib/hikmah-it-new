import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { pricingGroups } from '../data/siteData'

export default function PricingPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Packages</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Professional Service Packages</h1>
          <p className="mt-4 text-lg text-slate-300">Affordable pricing for websites, e-commerce stores, madrasah management systems and domain/hosting support.</p>
        </div>
      </section>

      {/* Pricing Groups */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-14">
            {pricingGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">{group.title}</h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.plans.map((plan) => (
                    <article key={plan.name} className={`flex flex-col h-full rounded-[2rem] border p-7 shadow-xl transition hover:shadow-2xl ${plan.highlighted ? 'border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 ring-2 ring-blue-100 lg:-translate-y-2' : 'border-slate-200 bg-white'}`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-white text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-3xl font-bold text-slate-900">Not sure which package?</h2>
          <p className="mt-3 text-slate-600">Contact us on WhatsApp and we will recommend the best option for your needs.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Contact Us Now</Button>
            <Button href="/services" variant="ghost-dark">See All Services</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
