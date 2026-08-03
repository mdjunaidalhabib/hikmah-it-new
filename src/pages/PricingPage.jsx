import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { pricingGroups } from '../data/siteData'

export default function PricingPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="Pricing & Packages"
        description="Affordable pricing for websites, e-commerce stores, madrasah management systems and domain/hosting support in Bangladesh."
      />
      <PageHero
        eyebrow="Packages"
        title="Professional Service Packages"
        text="Affordable pricing for websites, e-commerce stores, madrasah management systems and domain/hosting support."
      />

      {/* Pricing Groups */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-14">
            {pricingGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">{group.title}</h3>
                <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
                  {group.plans.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} />
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
