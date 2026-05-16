import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { FeatureCard } from '../components/Card'
import { ecommerceFeatures } from '../data/siteData'

export default function Ecommerce() {
  return (
    <section className="section split-section" id="ecommerce">
      <div className="container split-grid">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Main Service"
            title="Full e-commerce website with powerful admin panel"
            text="A professional online store needs more than a beautiful homepage. It needs product control, order workflow, customer trust, mobile shopping and admin management."
          />
          <div className="check-list">
            <span>✓ Product, category and stock management</span>
            <span>✓ Order, payment and delivery status</span>
            <span>✓ Customer account and order tracking</span>
            <span>✓ SEO-ready product pages</span>
          </div>
          <div className="section-actions">
            <Button href="#pricing">See Packages</Button>
            <Button href="#contact" variant="ghost-dark">Request Demo</Button>
          </div>
        </div>
        <div className="mockup-window">
          <div className="window-dots"><i /><i /><i /></div>
          <div className="mockup-content">
            <div className="mock-sidebar"><span /><span /><span /><span /></div>
            <div className="mock-main">
              <div className="mock-line large" />
              <div className="mock-cards"><i /><i /><i /></div>
              <div className="mock-table"><span /><span /><span /><span /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container feature-grid six-grid">
        {ecommerceFeatures.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  )
}
