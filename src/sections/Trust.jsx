import SectionHeader from '../components/SectionHeader'
import { trustItems } from '../data/siteData'

export default function Trust() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader eyebrow="Why Choose Us" title="Built for trust, speed and professional presentation" text="The design direction uses navy, blue and amber colors to build a premium, reliable and technology-focused brand identity." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title }) => <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 font-extrabold text-slate-950 shadow-lg shadow-slate-950/5" key={title}><Icon className="text-blue-600" size={22} /><span>{title}</span></div>)}
        </div>
      </div>
    </section>
  )
}
