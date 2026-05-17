import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/siteData'

export default function Portfolio() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-24" id="portfolio">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader eyebrow="Project Showcase" title="Recent website preview gallery" text="E-commerce, business website, landing page, portfolio website বা software preview—সব ধরনের কাজ এখানে clean card layout এ show করা যাবে। Card click করলে live website open হবে।" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <a className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5" href={item.url} target="_blank" rel="noreferrer" key={item.title}>
              <div className="relative h-56 overflow-hidden bg-slate-200"><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={item.image} alt={item.title} /><div className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition group-hover:bg-slate-950/45 group-hover:opacity-100"><span className="rounded-full bg-white px-4 py-2 font-black text-slate-950">Visit Website</span></div></div>
              <div className="p-6"><span className="font-extrabold text-blue-700">{item.category}</span><h3 className="mt-2 text-xl font-black text-slate-950">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.text}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
