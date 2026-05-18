import SectionHeader from "../components/SectionHeader";
import { FeatureCard } from "../components/Card";
import Button from "../components/Button";
import { madrasahFeatures } from "../data/siteData";

export default function Madrasah() {
  return (
    <section
      className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-8 lg:py-24"
      id="madrasah"
    >
      {/* Header */}
      <div className="mx-auto w-[min(1180px,calc(100%-40px))] text-center mb-12">
        <SectionHeader
          align="center"
          eyebrow="Education Software"
          title="Madrasah Management System with Website Control"
          text="A complete institution management system for madrasah, school or academy. Manage academic operations and public website content from a single admin panel."
        />
      </div>

      {/* Main Section */}
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-stretch gap-10 lg:grid-cols-2">
        {/* Left Dashboard */}
        <div className="h-full rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 text-slate-950 shadow-2xl shadow-blue-950/10">
          <div className="mb-5 rounded-3xl bg-gradient-to-br from-blue-400 via-blue-700 to-slate-900 p-5 text-center text-2xl font-black text-white">
            Madrasah Management Dashboard
          </div>

          <div className="grid gap-3">
            {[
              "Students",
              "Teachers",
              "Accounting",
              "Fees",
              "Results",
              "Admission",
              "Public Website",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white px-4 py-4 transition hover:shadow-md"
              >
                <span className="font-medium text-slate-700">{item}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info (Improved - NOT empty anymore) */}
        <div className="h-full flex flex-col justify-between rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
          {/* Top highlights */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 p-5">
              <h3 className="text-lg font-bold text-slate-800">
                All-in-One Control Panel
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Manage your entire institution without switching systems
              </p>
            </div>

            <div className="grid gap-3">
              {[
                "Student, teacher, staff and accounting management",
                "Fee, accounting, attendance, exam and result modules",
                "Notice, gallery, admission and library control",
                "Messaging system (SMS / Email / Notification)",
                "Fully dynamic public website management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-sm"
                >
                  <span className="mt-1 text-emerald-600">✓</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6">
            <Button href="#contact">Discuss System</Button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mx-auto mt-12 grid w-[min(1180px,calc(100%-40px))] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {madrasahFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
