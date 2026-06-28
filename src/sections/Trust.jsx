import SectionHeader from "../components/SectionHeader";
import { trustItems } from "../data/siteData";

export default function Trust() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built for Trust, Performance & Business Growth"
          text="We create professional websites and management systems that are fast, reliable, mobile-friendly, and designed to help businesses and institutions grow with confidence."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg shadow-slate-950/5 transition hover:shadow-xl"
            >
              <Icon className="text-blue-600" size={22} />
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
