import SectionHeader from '../components/SectionHeader'
import { ServiceCard } from '../components/Card'
import { services } from '../data/siteData'

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeader
          eyebrow="Our Services"
          title="Digital services that look professional and work practically"
          text="Everything is designed around real business needs: clean UI, responsive layout, conversion-focused pages and admin-ready workflows."
        />
        <div className="service-grid">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>
    </section>
  )
}
