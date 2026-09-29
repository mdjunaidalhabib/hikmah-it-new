import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import SmsHighlight from '../sections/SmsHighlight'
import Trust from '../sections/Trust'
import Testimonials from '../sections/Testimonials'
import Portfolio from '../sections/Portfolio'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Faq from '../sections/Faq'
import Contact from '../sections/Contact'
import { useLanguage } from '../i18n/LanguageContext'

export default function HomePage() {
  const { lang } = useLanguage()
  const seo = {
    en: {
      title: 'E-commerce & Madrasah Management Software',
      description:
        'Hikmah IT provides e-commerce websites, madrasah management systems, business websites, hosting/domain support, and digital services with professional admin panels.',
    },
    bn: {
      title: 'ই-কমার্স ও মাদরাসা ম্যানেজমেন্ট সফটওয়্যার',
      description:
        'Hikmah IT প্রফেশনাল অ্যাডমিন প্যানেল সহ ই-কমার্স ওয়েবসাইট, মাদরাসা ম্যানেজমেন্ট সিস্টেম, বিজনেস ওয়েবসাইট, হোস্টিং/ডোমেইন সাপোর্ট এবং ডিজিটাল সার্ভিস প্রদান করে।',
    },
  }[lang]

  return (
    <>
      <Seo title={seo.title} description={seo.description} />
      <Hero />
      <Services />
      <SmsHighlight />
      <Trust />
      <Testimonials />
      <Portfolio />
      <Pricing />
      <Process />
      <Faq />
      <Contact />
    </>
  )
}
