import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react'
import Button from '../components/Button'
import Logo from '../components/Logo'
import { brand, stats } from '../data/siteData'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-badge"><CheckCircle2 size={18} /> Professional Website & Software Agency</span>
          <h1>E-commerce, Business Website, Hosting & Madrasah Management System.</h1>
          <p>
            {brand.name} helps businesses and institutions launch modern websites, e-commerce platforms,
            admin dashboards, portfolio/landing pages, hosting-domain support and digital management systems with premium UI.
          </p>
          <div className="hero-buttons">
            <Button href="#contact">Start Your Project <ArrowRight size={18} /></Button>
            <Button href="#services" variant="ghost"><PlayCircle size={18} /> View Services</Button>
          </div>
          <div className="stats-grid">
            {stats.map((item) => (
              <div className="stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-top"><Logo dark /></div>
          <div className="dashboard-card big-card">
            <span>Admin Dashboard</span>
            <strong>৳ 2,45,000</strong>
            <small>Monthly sales overview</small>
            <div className="chart-bars"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="mini-grid">
            <div><strong>312</strong><span>Orders</span></div>
            <div><strong>1.2k</strong><span>Users</span></div>
            <div><strong>98%</strong><span>Uptime</span></div>
            <div><strong>SEO</strong><span>Ready</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
