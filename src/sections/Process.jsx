import SectionHeader from '../components/SectionHeader'
import { process } from '../data/siteData'

export default function Process() {
  return (
    <section className="bg-[#EAF3FF] py-20 lg:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader eyebrow="Work Process" title="Simple, clear and project-focused workflow" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5" key={item.step}><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 font-black text-white">{item.step}</span><h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
