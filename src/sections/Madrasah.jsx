import SectionHeader from "../components/SectionHeader";
import { FeatureCard } from "../components/Card";
import Button from "../components/Button";
import { madrasahFeatures } from "../data/siteData";

export default function Madrasah() {
  return (
    <section
      className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-10 sm:py-14 lg:py-24"
      id="madrasah"
    >
      {/* Header */}
      <div className="mx-auto w-[min(1180px,calc(100%-20px))] sm:w-[min(1180px,calc(100%-40px))] text-center mb-8 sm:mb-12">
        <SectionHeader
          align="center"
          eyebrow="Education Software"
          title="Madrasah Management System with Website Control"
          text="A complete institution management system for madrasah, school or academy. Manage academic operations and public website content from a single admin panel."
        />
      </div>

      {/* Main Section */}
      <div className="mx-auto grid w-[min(1180px,calc(100%-20px))] sm:w-[min(1180px,calc(100%-40px))] gap-6 sm:gap-10 lg:grid-cols-2">
        {/* Left Dashboard */}
        <div className="rounded-2xl sm:rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 shadow-xl sm:shadow-2xl">
          <div className="mb-4 sm:mb-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-400 via-blue-700 to-slate-900 p-4 sm:p-5 text-center text-lg sm:text-2xl font-black text-white">
            Madrasah Management Dashboard
          </div>

          <div className="grid gap-2 sm:gap-3">
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
                className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-blue-100 bg-white px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base"
              >
                <span className="font-medium text-slate-700">{item}</span>
                <span className="rounded-full bg-emerald-50 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold text-emerald-600">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col justify-between rounded-2xl sm:rounded-[2rem] border border-blue-100 bg-white p-5 sm:p-8 shadow-lg sm:shadow-xl">
          {/* Top highlights */}
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                All-in-One Control Panel
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Manage your entire institution without switching systems
              </p>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {[
                "Student, teacher, staff and accounting management",
                "Fee, accounting, attendance, exam and result modules",
                "Notice, gallery, admission and library control",
                "Messaging system (SMS / Email / Notification)",
                "Fully dynamic public website management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 text-sm"
                >
                  <span className="mt-1 text-emerald-600">✓</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-5 sm:mt-6">
            <Button href="#contact" className="w-full sm:w-auto">
              Discuss System
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mx-auto mt-10 sm:mt-12 grid w-[min(1180px,calc(100%-20px))] sm:w-[min(1180px,calc(100%-40px))] gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {madrasahFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}