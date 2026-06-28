import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { FeatureCard } from '../components/Card'
import Button from '../components/Button'
import { madrasahFeatures } from '../data/siteData'

export default function MadrasahPage() {
  return (
    <div className="bg-[#edf4ff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] py-10 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">Education Software</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Madrasah Management System with Website Control
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            A complete institution management system for madrasah, school or academy. Manage academic operations and public website content from a single admin panel.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Discuss System <ArrowRight size={16} /></Button>
            <Button href="/pricing" variant="ghost">See Pricing</Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-2xl">
            <div className="mb-5 rounded-3xl bg-gradient-to-br from-blue-400 via-blue-700 to-slate-900 p-5 text-center text-2xl font-black text-white">
              Madrasah Management Dashboard
            </div>
            <div className="grid gap-3">
              {["Students","Teachers","Accounting","Fees","Results","Admission","Public Website"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white px-4 py-4">
                  <span className="font-medium text-slate-700">{item}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">Active</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 p-5">
                <h3 className="text-lg font-bold text-slate-800">All-in-One Control Panel</h3>
                <p className="mt-1 text-sm text-slate-600">Manage your entire institution without switching systems</p>
              </div>
              <div className="grid gap-3">
                {["Student, teacher, staff and accounting management","Fee, accounting, attendance, exam and result modules","Notice, gallery, admission and library control","Messaging system (SMS / Email / Notification)","Fully dynamic public website management"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm">
                    <span className="mt-1 text-emerald-600">✓</span>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Button href="/contact">Discuss System</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="Modules" title="Complete features for institution management" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {madrasahFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
