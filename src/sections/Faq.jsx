import SectionHeader from "../components/SectionHeader";
import { faq } from "../data/siteData";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12" id="faq">
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="FAQ"
          title="সাধারণ জিজ্ঞাসা"
          text="যোগাযোগ করার আগে ক্লায়েন্টদের সংক্ষিপ্ত উত্তর।"
        />

        {/* 1 column on mobile, 2 columns on desktop */}
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group mb-4 break-inside-avoid rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition duration-300 hover:border-blue-200 hover:shadow-xl group-open:border-blue-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold tracking-tight text-slate-950 marker:content-none">
                <span className="pr-3">{item.q}</span>

                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition duration-300 group-open:rotate-180 group-open:bg-blue-100 group-open:text-blue-600">
                  <ChevronDown size={17} />
                </span>
              </summary>

              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
