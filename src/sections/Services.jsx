import SectionHeader from '../components/SectionHeader'
import { ServiceCard } from '../components/Card'
import { services } from '../data/siteData'

export default function Services() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-24" id="services">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader eyebrow="Our Services" title="Digital services that look professional and work practically" text="Everything is designed around real business needs: clean UI, responsive layout, conversion-focused pages and admin-ready workflows." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>
    </section>
  )
}
