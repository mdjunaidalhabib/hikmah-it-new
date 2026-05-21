import SectionHeader from "../components/SectionHeader";
import { faq } from "../data/siteData";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12" id="faq">
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="FAQ"
          title="Common Questions"
          text="Short answers for clients before they contact you."
        />

        {/* 1 column on mobile, 2 columns on desktop */}
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group mb-4 break-inside-avoid rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition duration-300 hover:shadow-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold tracking-tight text-slate-950">
                {item.q}

                <ChevronDown
                  size={20}
                  className="ml-3 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>

              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
