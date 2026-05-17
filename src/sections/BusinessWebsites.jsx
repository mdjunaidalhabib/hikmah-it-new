import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, Rocket } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { businessWebsiteTypes } from '../data/siteData'

const icons = [Rocket, MonitorSmartphone, Globe2]

export default function BusinessWebsites() {
  return (
    <section className="bg-[#EAF3FF] py-20 lg:py-24" id="business-websites">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader align="left" eyebrow="Business Website" title="Landing page, portfolio website ও business website" text="Professional website solutions for personal brand, service business, company profile and campaign-focused online presence. Package price details are shown in the pricing section." />
          <div className="grid gap-4">
            {businessWebsiteTypes.map((item, index) => {
              const Icon = icons[index]
              return (
                <article className="relative flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5" key={item.title}>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white"><Icon size={21} /></div>
                  <div><h3 className="text-xl font-black text-slate-950">{item.title}</h3><small className="font-extrabold text-blue-700">{item.tag}</small><p className="mt-2 leading-7 text-slate-600">{item.text}</p></div>
                  <ArrowRight className="absolute right-5 top-5 text-blue-600" size={18} />
                </article>
              )
            })}
          </div>
          <div className="my-6 flex flex-wrap gap-3 text-sm font-extrabold text-slate-700">
            {['Clean responsive design','Lead focused structure','Domain separate'].map(item => <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2" key={item}><CheckCircle2 size={16} /> {item}</span>)}
          </div>
          <div className="flex flex-wrap gap-3"><Button href="#pricing">See Website Packages</Button><Button href="#portfolio" variant="ghost-dark">View Showcase</Button></div>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15">
          <div className="mb-4 flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500"/><span className="h-3 w-3 rounded-full bg-blue-500"/><span className="h-3 w-3 rounded-full bg-emerald-500"/><strong className="ml-2 text-sm">Website Preview</strong></div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-7"><small className="font-extrabold text-blue-200">Professional Website</small><h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em]">Build trust, showcase your work and collect leads</h3><p className="mt-4 leading-7 text-slate-300">Modern layout, service highlights, portfolio area, testimonials and WhatsApp/Facebook contact flow.</p></div>
          <div className="mt-4 grid grid-cols-2 gap-4"><div className="rounded-3xl bg-blue-600/25 p-5"><strong>Portfolio</strong><span className="block text-sm text-slate-300">Work showcase</span></div><div className="rounded-3xl bg-amber-500/25 p-5"><strong>Landing</strong><span className="block text-sm text-slate-300">Campaign focused</span></div></div>
        </div>
      </div>
    </section>
  )
}
