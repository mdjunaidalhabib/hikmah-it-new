import { Globe2, Mail, MapPin, PhoneCall, Send } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { brand } from '../data/siteData'

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Contact"
            title="Ready to make your website professional?"
            text="Send project details: business type, needed package, hosting/domain requirement, admin panel features and launch target."
          />
          <div className="contact-cards">
            <a href={brand.phoneHref}><PhoneCall size={20} /><span>{brand.phone}</span></a>
            <a href={brand.emailHref}><Mail size={20} /><span>{brand.email}</span></a>
            <a href={brand.facebook} target="_blank" rel="noreferrer"><Globe2 size={20} /><span>Visit Facebook Page</span></a>
            <div><MapPin size={20} /><span>{brand.location}</span></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>Name<input type="text" placeholder="Your name" /></label>
          <label>Phone<input type="tel" placeholder="Your phone number" /></label>
          <label>Service
            <select defaultValue="">
              <option value="" disabled>Select service</option>
              <option>E-commerce Website</option>
              <option>Madrasah Management System</option>
              <option>Business Website</option>
              <option>Portfolio Website</option>
              <option>Single Page Landing Website</option>
              <option>Hosting & Domain</option>
            </select>
          </label>
          <label>Message<textarea rows="4" placeholder="Write your project details" /></label>
          <Button href={brand.whatsapp}><Send size={18} /> Send on WhatsApp</Button>
        </form>
      </div>
    </section>
  )
}
