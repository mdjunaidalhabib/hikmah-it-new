import SectionHeader from '../components/SectionHeader'
import { trustItems } from '../data/siteData'

export default function Trust() {
  return (
    <section className="section trust-section">
      <div className="container">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built for trust, speed and professional presentation"
          text="The design direction uses navy, blue and amber colors to build a premium, reliable and technology-focused brand identity."
        />
        <div className="trust-grid">
          {trustItems.map(({ icon: Icon, title }) => (
            <div className="trust-item" key={title}><Icon size={22} /><span>{title}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}
