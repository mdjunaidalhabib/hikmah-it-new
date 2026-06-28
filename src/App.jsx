import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './sections/Navbar'
import Footer from './sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import EcommercePage from './pages/EcommercePage'
import HostingPage from './pages/HostingPage'
import MadrasahPage from './pages/MadrasahPage'
import BusinessPage from './pages/BusinessPage'
import PricingPage from './pages/PricingPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import EarnPage from './pages/EarnPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-slate-950 antialiased">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ecommerce" element={<EcommercePage />} />
            <Route path="/hosting" element={<HostingPage />} />
            <Route path="/madrasah" element={<MadrasahPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/earn" element={<EarnPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}
