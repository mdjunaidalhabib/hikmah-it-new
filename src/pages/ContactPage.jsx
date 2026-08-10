import { Globe2, Mail, MapPin, PhoneCall } from 'lucide-react'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { brand } from '../data/siteData'
import useSiteSettings from '../lib/useSiteSettings'

const contactItem = "flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-blue-300 hover:text-blue-700"

export default function ContactPage() {
  const { settings } = useSiteSettings()
  const phone = settings?.phone || brand.phone
  const phoneHref = settings?.phone ? `tel:+88${settings.phone.replace(/\D/g, "")}` : brand.phoneHref
  const email = settings?.email || brand.email
  const emailHref = settings?.email ? `mailto:${settings.email}` : brand.emailHref
  const location = settings?.location || brand.location
  const facebook = settings?.facebook || brand.facebook
  const whatsapp = settings?.whatsapp || brand.whatsapp

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="যোগাযোগ করুন"
        description="আপনার ওয়েবসাইট, ই-কমার্স বা মাদরাসা ম্যানেজমেন্ট প্রজেক্টের জন্য Hikmah IT-এর সাথে যোগাযোগ করুন। ফোন, ইমেইল বা WhatsApp-এর মাধ্যমে আমাদের কাছে পৌঁছান।"
      />
      <PageHero
        eyebrow="যোগাযোগ"
        title="আপনার ওয়েবসাইট প্রফেশনাল করতে প্রস্তুত?"
        text="প্রজেক্টের বিস্তারিত পাঠান: ব্যবসার ধরন, প্রয়োজনীয় প্যাকেজ, হোস্টিং/ডোমেইন প্রয়োজনীয়তা এবং লঞ্চ টার্গেট।"
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1100px,calc(100%-40px))] items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">যোগাযোগ করুন</h2>
            <div className="grid gap-3">
              <a className={contactItem} href={phoneHref}><PhoneCall size={18} /><span>{phone}</span></a>
              <a className={contactItem} href={emailHref}><Mail size={18} /><span>{email}</span></a>
              <a className={contactItem} href={facebook} target="_blank" rel="noreferrer"><Globe2 size={18} /><span>ফেসবুক পেজ দেখুন</span></a>
              <div className={contactItem}><MapPin size={18} /><span>{location}</span></div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-slate-900">রেসপন্স টাইম</h3>
              <p className="mt-2 text-slate-600">সাধারণত আমরা WhatsApp-এ কয়েক ঘণ্টার মধ্যে রিপ্লাই দিই। বিস্তারিত প্রজেক্ট আলোচনার জন্য ফোন বা ইমেইলে যোগাযোগ করুন।</p>
              <div className="mt-4">
                <Button href={whatsapp}>WhatsApp-এ মেসেজ করুন</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <h3 className="w-full max-w-md text-xl font-bold text-slate-900">মেসেজ পাঠান</h3>
            <ContactForm className="w-full max-w-md" />
          </div>
        </div>
      </section>
    </div>
  )
}
