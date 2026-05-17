import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { navItems } from "../data/siteData";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />

        <nav className={`nav-menu ${open ? "nav-open" : ""}`}>
          {navItems.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <Button href="#contact" variant="small">
            Get Quote
          </Button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
