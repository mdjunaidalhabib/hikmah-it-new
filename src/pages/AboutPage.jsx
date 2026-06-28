import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { aboutStats, whyUs, owner, brand, trustItems } from '../data/siteData'

export default function AboutPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Who We Are</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">About Hikmah IT</h1>
          <p className="mt-4 text-lg text-slate-300">{brand.tagline} — helping businesses and institutions across Bangladesh build a powerful digital presence.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-blue-100 bg-white p-6 text-center shadow-lg">
                <strong className="block text-4xl font-extrabold text-blue-600">{stat.value}</strong>
                <span className="mt-1 block text-sm font-semibold text-slate-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Our Story</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Built from a passion for helping businesses go digital</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Hikmah IT was founded with a clear mission: make professional web development accessible to small businesses and educational institutions across Bangladesh. Too many businesses were missing out on digital growth because quality web solutions were either too expensive or too complicated.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              We started building simple, clean and effective websites — e-commerce stores, business websites, portfolio pages and institution management systems — at prices that actually work for the Bangladesh market.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services">Our Services <ArrowRight size={16} /></Button>
              <Button href="/contact" variant="ghost-dark">Talk to Us</Button>
            </div>
          </div>

          {/* Mission/Vision */}
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🎯</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="mt-2 leading-7 text-slate-600">To empower every business, institution and entrepreneur in Bangladesh with affordable, professional and results-driven digital solutions — from a clean website to a full management system.</p>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl">
              <span className="text-3xl">🌟</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="mt-2 leading-7 text-slate-600">To become Bangladesh's most trusted digital agency for small to medium businesses — known for clean design, honest pricing and real support that doesn't stop at delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Why Hikmah IT" title="Why businesses choose us" text="We build for Bangladesh — we understand the local market, payment methods and business culture." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-[#edf4ff] p-6 shadow-lg transition hover:shadow-xl">
                <CheckCircle2 className="text-blue-600" size={26} />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Our Standards" title="Built for trust, speed and professional presentation" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg transition hover:shadow-xl">
                <Icon className="text-blue-600" size={22} />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner brief */}
      <section className="py-8 pb-16 bg-white">
        <div className="mx-auto w-[min(900px,calc(100%-40px))]">
          <div className="rounded-[2rem] border border-blue-200 bg-[#edf4ff] p-8 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-800 text-2xl font-black text-white shadow-lg">
              {owner.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{owner.name}</h3>
            <p className="mt-1 text-sm font-semibold text-blue-600">{owner.role}, Hikmah IT</p>
            <p className="mt-4 mx-auto max-w-lg leading-7 text-slate-600">"{owner.bio}"</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/team">Meet the Full Team <ArrowRight size={16} /></Button>
              <Button href="/contact" variant="ghost-dark">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
