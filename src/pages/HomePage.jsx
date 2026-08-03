import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Trust from '../sections/Trust'
import Portfolio from '../sections/Portfolio'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Faq from '../sections/Faq'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <>
      <Seo
        title="E-commerce & Madrasah Management Software"
        description="Hikmah IT provides professional e-commerce websites with admin panel, madrasah management system, business websites, hosting/domain support and digital services."
      />
      <Hero />
      <Services />
      <Trust />
      <Portfolio />
      <Pricing />
      <Process />
      <Faq />
      <Contact />
    </>
  )
}
