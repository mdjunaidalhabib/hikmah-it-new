import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { FeatureCard } from '../components/Card'
import { ecommerceFeatures } from '../data/siteData'

export default function Ecommerce() {
  return (
    <section className="bg-[#EAF3FF] py-20 lg:py-24" id="ecommerce">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader align="left" eyebrow="Main Service" title="Full e-commerce website with powerful admin panel" text="A professional online store needs more than a beautiful homepage. It needs product control, order workflow, customer trust, mobile shopping and admin management." />
          <div className="my-6 grid gap-3">
            {['Product, category and stock management','Order, payment and delivery status','Customer account and order tracking','SEO-ready product pages'].map((item) => <span className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700" key={item}>✓ {item}</span>)}
          </div>
          <div className="flex flex-wrap gap-3"><Button href="#pricing">See Packages</Button><Button href="#contact" variant="ghost-dark">Request Demo</Button></div>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/15">
          <div className="mb-4 flex gap-2"><i className="h-3 w-3 rounded-full bg-amber-500" /><i className="h-3 w-3 rounded-full bg-blue-500" /><i className="h-3 w-3 rounded-full bg-emerald-500" /></div>
          <div className="grid min-h-80 grid-cols-[110px_1fr] gap-4 rounded-3xl bg-slate-50 p-5 max-sm:grid-cols-1">
            <div className="grid content-start gap-3 rounded-2xl bg-slate-200 p-4 max-sm:hidden">{[1,2,3,4].map(i => <span className="h-3 rounded-full bg-slate-400" key={i} />)}</div>
            <div className="grid content-start gap-4"><span className="h-6 w-2/3 rounded-full bg-slate-950" /><div className="grid grid-cols-3 gap-3">{[1,2,3].map(i => <i className="h-20 rounded-2xl bg-blue-100" key={i} />)}</div><div className="grid gap-3 rounded-2xl bg-white p-4">{[1,2,3,4].map(i => <span className="h-3 rounded-full bg-slate-300" key={i} />)}</div></div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 grid w-[min(1180px,calc(100%-40px))] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ecommerceFeatures.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  )
}
