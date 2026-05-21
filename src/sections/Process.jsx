import SectionHeader from "../components/SectionHeader";
import { process } from "../data/siteData";

export default function Process() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="Work Process"
          title="Simple, clear and project-focused workflow"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition hover:shadow-xl"
            >
              {/* Step Number */}
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 font-bold text-white">
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
