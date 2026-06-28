import { Globe2, ServerCog, CheckCircle2, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { brand } from '../data/siteData'

const listItem = "flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[15px] leading-6 text-slate-700"

export default function HostingPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Domain & Hosting Support</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Domain Buying & Hosting Payment Assistance
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            We help customers buy domains from international providers and provide payment assistance for hosting purchases from trusted global platforms.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Get Support <ArrowRight size={16} /></Button>
            <Button href="/pricing" variant="ghost">See Pricing</Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Domain */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white"><Globe2 size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Domain Buying Support</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">Buy Domain from International Sites</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm text-slate-500">Starting From</p>
                <strong className="mt-1 block text-3xl font-semibold text-blue-700">৳1,500+</strong>
                <p className="mt-2 text-sm text-slate-600">Domain price depends on provider, extension, and availability.</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600">We assist you in buying domains from trusted international domain providers such as Namecheap, GoDaddy, Hostinger, or similar platforms.</p>
              <div className="my-5 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 text-slate-500">
                <span>yourbusiness.com</span>
                <span className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white">Check</span>
              </div>
              <ul className="grid gap-3">
                {["Domain name research and availability checking","Domain purchase support from international platforms","Extension guidance for .com, .net, .org, and others","Basic domain setup support after purchase"].map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-blue-600" /><span>{item}</span></li>
                ))}
              </ul>
            </article>

            {/* Hosting */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white"><ServerCog size={28} /></div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Hosting Payment Support</span>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">Hosting Payment Assistance Only</h3>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm text-slate-500">Service Charge</p>
                <strong className="mt-1 block text-3xl font-semibold text-amber-700">৳300</strong>
                <p className="mt-2 text-sm text-slate-600">Hosting bill will be paid directly to the provider by the customer.</p>
              </div>
              <p className="mt-5 leading-7 text-slate-600">We do not sell or provide hosting directly. We only help customers complete payments for hosting plans from trusted international providers.</p>
              <ul className="mt-5 grid gap-3">
                {["Payment assistance for international hosting providers","Support for Hostinger, Namecheap, GoDaddy, or similar platforms","bKash, Nagad, Rocket, or local gateway payment support","Customer pays the provider bill; our service charge is ৳300"].map((item) => (
                  <li key={item} className={listItem}><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-blue-600" /><span>{item}</span></li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>Order Support</Button>
            <Button href="/contact" variant="ghost-dark">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
