import SectionHeader from '../components/SectionHeader'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { madrasahFeatures } from '../data/siteData'

export default function Madrasah() {
  return (
    <section className="bg-[#EAF3FF] py-20 lg:py-24" id="madrasah">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15">
          <div className="mb-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-blue-600 p-5 text-2xl font-black">Madrasah Management Dashboard</div>
          <div className="grid gap-3">
            {['Students', 'Teachers', 'Attendance', 'Accounting', 'Fees', 'Result', 'Public Website'].map((item) => <div className="flex justify-between rounded-2xl border border-white/10 bg-white/10 p-4" key={item}><span>{item}</span><strong className="text-emerald-300">Active</strong></div>)}
          </div>
        </div>
        <div>
          <SectionHeader align="left" eyebrow="Education Software" title="Madrasah Management System with website control" text="A complete institution management direction for madrasah, school or academy. Admin can manage academic data and public website content from one place." />
          <div className="my-6 grid gap-3">{['Student, teacher, staff and accounting management','Fee, accounting, attendance, exam and result modules','Notice, gallery and admission section control','Public website managed from admin panel'].map((item) => <span className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700" key={item}>✓ {item}</span>)}</div>
          <Button href="#contact">Discuss System</Button>
        </div>
      </div>
      <div className="mx-auto mt-10 grid w-[min(1180px,calc(100%-40px))] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {madrasahFeatures.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  )
}
