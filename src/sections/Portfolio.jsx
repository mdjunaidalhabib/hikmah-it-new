import SectionHeader from "../components/SectionHeader";
import { portfolio } from "../data/siteData";

export default function Portfolio() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12" id="portfolio">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="Project Showcase"
          title="Recent website preview gallery"
          text="Click the card to visit the live website."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              {/* Image Wrapper */}
              <div className="relative aspect-video overflow-hidden border-b border-slate-200 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                    Visit Website
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {item.category}
                </span>

                <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">
                  {item.text}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
