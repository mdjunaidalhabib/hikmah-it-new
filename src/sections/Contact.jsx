import { Globe2, Mail, MapPin, PhoneCall, Send } from 'lucide-react'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { brand } from '../data/siteData'

const inputClass = 'mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100';
const contactItem = 'flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-4 font-medium text-slate-700 shadow-lg shadow-slate-950/5 transition hover:border-blue-200 hover:text-blue-700';

export default function Contact() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 text-slate-950 lg:py-24" id="contact">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader align="left" eyebrow="Contact" title="Ready to make your website professional?" text="Send project details: business type, needed package, hosting/domain requirement, admin panel features and launch target." />
          <div className="grid gap-3">
            <a className={contactItem} href={brand.phoneHref}><PhoneCall size={20} /><span>{brand.phone}</span></a>
            <a className={contactItem} href={brand.emailHref}><Mail size={20} /><span>{brand.email}</span></a>
            <a className={contactItem} href={brand.facebook} target="_blank" rel="noreferrer"><Globe2 size={20} /><span>Visit Facebook Page</span></a>
            <div className={contactItem}><MapPin size={20} /><span>{brand.location}</span></div>
          </div>
        </div>
        <form className="grid gap-4 rounded-[2rem] bg-white p-7 text-slate-950 border border-slate-200 shadow-2xl shadow-slate-950/10" onSubmit={(e) => e.preventDefault()}>
          <label className="font-medium text-slate-700">Name<input className={inputClass} type="text" placeholder="Your name" /></label>
          <label className="font-medium text-slate-700">Phone<input className={inputClass} type="tel" placeholder="Your phone number" /></label>
          <label className="font-medium text-slate-700">Service
            <select className={inputClass} defaultValue="">
              <option value="" disabled>Select service</option>
              <option>E-commerce Website</option>
              <option>Madrasah Management System</option>
              <option>Business Website</option>
              <option>Portfolio Website</option>
              <option>Single Page Landing Website</option>
              <option>Hosting & Domain</option>
            </select>
          </label>
          <label className="font-medium text-slate-700">Message<textarea className={inputClass} rows="4" placeholder="Write your project details" /></label>
          <Button href={brand.whatsapp}><Send size={18} /> Send on WhatsApp</Button>
        </form>
      </div>
    </section>
  )
}
