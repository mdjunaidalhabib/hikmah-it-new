import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Trust from '../sections/Trust'
import Testimonials from '../sections/Testimonials'
import Portfolio from '../sections/Portfolio'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Faq from '../sections/Faq'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <>
      <Seo
        title="ই-কমার্স ও মাদরাসা ম্যানেজমেন্ট সফটওয়্যার"
        description="Hikmah IT প্রফেশনাল অ্যাডমিন প্যানেল সহ ই-কমার্স ওয়েবসাইট, মাদরাসা ম্যানেজমেন্ট সিস্টেম, বিজনেস ওয়েবসাইট, হোস্টিং/ডোমেইন সাপোর্ট এবং ডিজিটাল সার্ভিস প্রদান করে।"
      />
      <Hero />
      <Services />
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
