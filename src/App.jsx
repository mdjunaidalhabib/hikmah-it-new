import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Ecommerce from './sections/Ecommerce'
import BusinessWebsites from './sections/BusinessWebsites'
import Hosting from './sections/Hosting'
import Madrasah from './sections/Madrasah'
import Trust from './sections/Trust'
import Process from './sections/Process'
import Pricing from './sections/Pricing'
import Portfolio from './sections/Portfolio'
import Faq from './sections/Faq'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="font-sans text-slate-950 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Ecommerce />
        <BusinessWebsites />
        <Hosting />
        <Madrasah />
        <Trust />
        <Process />
        <Pricing />
        <Portfolio />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
