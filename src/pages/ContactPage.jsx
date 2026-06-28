import { Globe2, Mail, MapPin, PhoneCall, Send } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { brand } from '../data/siteData'

const inputClass = "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
const contactItem = "flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-blue-300 hover:text-blue-700"

export default function ContactPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Contact</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Ready to make your website professional?</h1>
          <p className="mt-4 text-lg text-slate-300">Send project details: business type, needed package, hosting/domain requirement and launch target.</p>
        </div>
      </section>

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

          <div className="flex justify-center lg:justify-end">
            <form className="w-full max-w-md grid gap-3 rounded-2xl bg-white p-6 border border-blue-100 shadow-xl" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-xl font-bold text-slate-900">Send a Message</h3>
              <label className="text-sm font-medium text-slate-700">Name
                <input className={inputClass} type="text" placeholder="Your name" />
              </label>
              <label className="text-sm font-medium text-slate-700">Phone
                <input className={inputClass} type="tel" placeholder="Your phone number" />
              </label>
              <label className="text-sm font-medium text-slate-700">Service
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>Select service</option>
                  <option>E-commerce Website</option>
                  <option>Madrasah Management System</option>
                  <option>Business Website</option>
                  <option>Portfolio Website</option>
                  <option>Landing Page</option>
                  <option>Hosting & Domain</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">Message
                <textarea className={inputClass} rows="3" placeholder="Write your project details" />
              </label>
              <Button href={brand.whatsapp}><Send size={16} /> Send on WhatsApp</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
