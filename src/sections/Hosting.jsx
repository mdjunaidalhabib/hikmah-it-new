import { Globe2, ServerCog } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { brand } from '../data/siteData'

export default function Hosting() {
  return (
    <section className="section hosting-section" id="hosting">
      <div className="container">
        <SectionHeader
          eyebrow="Domain & Hosting Support"
          title="Domain purchase and international hosting support"
          text="International provider থেকে domain ও hosting কিনতে আমরা সহায়তা করি। বাংলাদেশি payment gateway/mobile banking দিয়ে payment support পাওয়া যাবে।"
        />
        <div className="domain-hosting-two-col">
          <article className="support-service-card domain-service-card">
            <div className="support-card-icon"><Globe2 size={28} /></div>
            <span className="support-eyebrow">Domain Support</span>
            <h3>Domain Purchase Support</h3>
            <strong className="support-price">৳1,500+</strong>
            <p>International provider থেকে domain কেনার জন্য সহজ ও পরিষ্কার support.</p>
            <div className="domain-search-ui support-search-ui">
              <span>yourbusiness.com</span>
              <button>Check</button>
            </div>
            <ul className="support-feature-list">
              <li>Domain name research and availability checking</li>
              <li>.com, .net, .org and relevant extension guidance</li>
              <li>Domain price extension/provider অনুযায়ী vary করবে</li>
            </ul>
          </article>

          <article className="support-service-card hosting-service-card premium-support-card">
            <div className="support-card-icon"><ServerCog size={28} /></div>
            <span className="support-eyebrow">International Hosting</span>
            <h3>Hosting Purchase Support</h3>
            <strong className="support-price">৳300 service charge</strong>
            <p>Hosting আমরা নিজেরা sell/provide করি না। Trusted international provider থেকে hosting কিনতে payment support দেওয়া হবে।</p>
            <ul className="support-feature-list">
              <li>Hostinger/Namecheap বা trusted provider থেকে purchase help</li>
              <li>bKash, Nagad, Rocket বা BD gateway payment support</li>
              <li>Provider bill customer pay করবে; আমাদের service charge ৳300</li>
            </ul>
          </article>

        </div>
        <div className="section-actions centered-actions">
          <Button href={brand.whatsapp}>Order Support</Button>
          <Button href="#contact" variant="ghost-dark">Contact Us</Button>
        </div>
      </div>
    </section>
  )
}
