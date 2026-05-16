import Logo from '../components/Logo'
import { navItems, brand } from '../data/siteData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand-row"><Logo dark /></div>
          <p>{brand.tagline}. We build modern websites, e-commerce platforms, domain/international hosting support and institution management solutions.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <div>
          <h4>Main Services</h4>
          <a href="#ecommerce">E-commerce Website</a>
          <a href="#madrasah">Madrasah Management</a>
          <a href="#business-websites">Portfolio Website</a>
          <a href="#business-websites">Landing Page</a>
          <a href="#hosting">Hosting & Domain</a>
        </div>
        <div>
          <h4>Contact</h4>
          <span>{brand.phone}</span>
          <span>{brand.email}</span>
          <span>{brand.location}</span>
          <a href={brand.facebook} target="_blank" rel="noreferrer">Visit Facebook Page</a>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Hikmah IT. All rights reserved.</div>
    </footer>
  )
}
