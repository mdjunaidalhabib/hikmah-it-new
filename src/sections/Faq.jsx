import SectionHeader from '../components/SectionHeader'
import { faq } from '../data/siteData'

export default function Faq() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-24" id="faq">
      <div className="mx-auto w-[min(900px,calc(100%-40px))]">
        <SectionHeader eyebrow="FAQ" title="Common questions" text="Short answers for clients before they contact you." />
        <div className="grid gap-4">
          {faq.map((item) => (
            <details key={item.q} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5">
              <summary className="cursor-pointer list-none text-lg font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
