import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { businessWebsiteTypes } from '../data/siteData'

const icons = [Rocket, MonitorSmartphone, Globe2]

export default function BusinessWebsites() {
  return (
    <section className="section business-section" id="business-websites">
      <div className="container business-layout refined-business-layout">
        <div className="business-copy">
          <SectionHeader
            align="left"
            eyebrow="Business Website"
            title="Landing page, portfolio website ও business website"
            text="Professional website solutions for personal brand, service business, company profile and campaign-focused online presence. Package price details are shown in the pricing section."
          />
          <div className="business-highlight-grid pro-package-list">
            {businessWebsiteTypes.map((item, index) => {
              const Icon = icons[index]
              return (
                <article className={`business-highlight-card ${item.title === 'Portfolio Website' ? 'business-featured' : ''}`} key={item.title}>
                  <div className="business-icon"><Icon size={21} /></div>
                  <div>
                    <div className="package-card-head clean-package-head">
                      <h3>{item.title}</h3>
                    </div>
                    <small>{item.tag}</small>
                    <p>{item.text}</p>
                  </div>
                  <ArrowRight className="business-arrow" size={18} />
                </article>
              )
            })}
          </div>
          <div className="mini-benefits">
            <span><CheckCircle2 size={16} /> Clean responsive design</span>
            <span><CheckCircle2 size={16} /> Lead focused structure</span>
            <span><CheckCircle2 size={16} /> Domain separate</span>
          </div>
          <div className="section-actions">
            <Button href="#pricing">See Website Packages</Button>
            <Button href="#portfolio" variant="ghost-dark">View Showcase</Button>
          </div>
        </div>
        <div className="website-showcase-panel compact-showcase-panel business-preview-balanced">
          <div className="showcase-toolbar"><span></span><span></span><span></span><strong>Website Preview</strong></div>
          <div className="showcase-hero-card compact-hero-card">
            <small>Professional Website</small>
            <h3>Build trust, showcase your work and collect leads</h3>
            <p>Modern layout, service highlights, portfolio area, testimonials and WhatsApp/Facebook contact flow.</p>
          </div>
          <div className="showcase-bottom-grid compact-bottom-grid">
            <div className="showcase-mini-card blue"><strong>Portfolio</strong><span>Work showcase</span></div>
            <div className="showcase-mini-card amber"><strong>Landing</strong><span>Campaign focused</span></div>
          </div>
          <div className="showcase-preview-strip">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
