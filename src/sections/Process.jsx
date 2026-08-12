import SectionHeader from "../components/SectionHeader";
import { workProcess } from "../data/siteData";

export default function Process() {
  return (
    <section className="bg-brand-50 py-8 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="কাজের প্রক্রিয়া"
          title="সহজ, স্পষ্ট ও প্রজেক্ট-ফোকাসড ওয়ার্কফ্লো"
        />

        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Connector line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden border-t-2 border-dashed border-brand-200 lg:block" />

          {workProcess.map((item) => (
            <article
              key={item.step}
              className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              {/* Step Number */}
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-bold text-white shadow-lg shadow-brand-950/20 ring-4 ring-brand-50 transition duration-300 group-hover:scale-105">
                {item.step}
              </span>

              {/* Title */}
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
