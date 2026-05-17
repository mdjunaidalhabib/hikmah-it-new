import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react'
import Button from '../components/Button'
import { brand } from '../data/siteData'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-20 text-white lg:py-24" id="home">
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-extrabold text-blue-100"><CheckCircle2 size={18} /> Professional Website & Software Agency</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[.98] tracking-[-0.06em] sm:text-5xl lg:text-7xl">E-commerce, Business Website, Hosting & Madrasah Management System.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {brand.name} helps businesses and institutions launch modern websites, e-commerce platforms,
            admin dashboards, portfolio/landing pages, hosting-domain support and digital management systems with premium UI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">Start Your Project <ArrowRight size={18} /></Button>
            <Button href="#services" variant="ghost"><PlayCircle size={18} /> View Services</Button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between text-sm font-extrabold text-slate-200">
            <span>Admin Dashboard</span>
            <button type="button" className="rounded-full bg-white/10 px-3 py-1.5">This Month ⌄</button>
          </div>
          <div className="rounded-3xl bg-white p-6 text-slate-950">
            <span className="font-bold text-slate-500">Monthly sales overview</span>
            <strong className="mt-2 block text-4xl font-black tracking-[-0.05em]">৳ 2,45,000</strong>
            <div className="mt-6 flex h-32 items-end gap-3">
              {['h-[45%]', 'h-[70%]', 'h-[55%]', 'h-[90%]', 'h-[62%]'].map((height) => <i key={height} className={`${height} block flex-1 rounded-t-2xl bg-gradient-to-t from-blue-600 to-blue-200`} />)}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['312|Orders', '1.2k|Users', '98%|Uptime', 'SEO|Ready'].map((item) => {
              const [big, small] = item.split('|')
              return <div className="rounded-2xl bg-white/10 p-4" key={item}><strong className="block text-lg">{big}</strong><span className="text-xs text-slate-300">{small}</span></div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
