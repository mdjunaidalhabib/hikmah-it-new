import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { navItems } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071028]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[58px] w-[min(1180px,calc(100%-40px))] items-center justify-between gap-3">
        <Logo />
        <nav className={`${open ? 'flex' : 'hidden'} absolute left-5 right-5 top-[68px] flex-col gap-1 rounded-3xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800 shadow-2xl shadow-slate-950/15 lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:text-white/85 lg:shadow-none`}>
          {navItems.map(({ href, label }) => (
            <a className="rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700 lg:hover:bg-white/10 lg:hover:text-white" key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="#contact" variant="small">Get Quote</Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/20 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  )
}
