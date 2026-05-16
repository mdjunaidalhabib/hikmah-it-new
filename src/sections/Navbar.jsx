import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { navItems } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav className={`nav-menu ${open ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Button href="#contact" variant="small">Get Quote</Button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
