import { Globe2, Mail, MapPin, PhoneCall } from 'lucide-react'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { brand } from '../data/siteData'

const contactItem = "flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-blue-300 hover:text-blue-700"

export default function ContactPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="Contact Us"
        description="Get in touch with Hikmah IT for your website, e-commerce or madrasah management project. Reach us via phone, email or WhatsApp."
      />
      <PageHero
        eyebrow="Contact"
        title="Ready to make your website professional?"
        text="Send project details: business type, needed package, hosting/domain requirement and launch target."
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1100px,calc(100%-40px))] items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Get in Touch</h2>
            <div className="grid gap-3">
              <a className={contactItem} href={brand.phoneHref}><PhoneCall size={18} /><span>{brand.phone}</span></a>
              <a className={contactItem} href={brand.emailHref}><Mail size={18} /><span>{brand.email}</span></a>
              <a className={contactItem} href={brand.facebook} target="_blank" rel="noreferrer"><Globe2 size={18} /><span>Visit Facebook Page</span></a>
              <div className={contactItem}><MapPin size={18} /><span>{brand.location}</span></div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-slate-900">Response Time</h3>
              <p className="mt-2 text-slate-600">We typically reply within a few hours on WhatsApp. For detailed project discussions, reach out via phone or email.</p>
              <div className="mt-4">
                <Button href={brand.whatsapp}>Message on WhatsApp</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <h3 className="w-full max-w-md text-xl font-bold text-slate-900">Send a Message</h3>
            <ContactForm className="w-full max-w-md" />
          </div>
        </div>
      </section>
    </div>
  )
}
