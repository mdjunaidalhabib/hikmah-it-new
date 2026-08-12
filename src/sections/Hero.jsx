import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import Button from "../components/Button";
import { brand, aboutStats } from "../data/siteData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-light pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-24" id="home">
      <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600 shadow-sm shadow-brand-900/5 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
            <CheckCircle2 size={16} className="shrink-0 sm:hidden" />
            <CheckCircle2 size={18} className="hidden shrink-0 sm:block" />
            প্রফেশনাল ওয়েবসাইট ও সফটওয়্যার এজেন্সি
          </span>
          <h1 className="mt-5 max-w-2xl text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl sm:leading-[1.3] lg:text-[2.65rem] lg:leading-[1.2]">
            <span className="block text-brand-600">ই-কমার্স ওয়েবসাইট, </span>
            <span className="block text-emerald-600">মাদরাসা ম্যানেজমেন্ট সিস্টেম, </span>
            <span className="block text-blue-600">পোর্টফোলিও & বিজনেস সাইট, </span>
            <span className="block text-violet-600">ডোমেইন ও হোস্টিং সার্ভিস।</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {brand.name} ব্যবসা ও প্রতিষ্ঠানকে আধুনিক ওয়েবসাইট, ই-কমার্স প্ল্যাটফর্ম, অ্যাডমিন ড্যাশবোর্ড, পোর্টফোলিও/ল্যান্ডিং পেজ, হোস্টিং-ডোমেইন সাপোর্ট এবং প্রিমিয়াম ইউআই সহ ডিজিটাল ম্যানেজমেন্ট সিস্টেম তৈরিতে সাহায্য করে।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">
              প্রজেক্ট শুরু করুন <ArrowRight size={18} />
            </Button>
            <Button href="/services" variant="ghost-dark">
              <PlayCircle size={18} /> সার্ভিস দেখুন
            </Button>
          </div>

          {/* Stats row — real numbers, reused from About page data */}
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200/70 pt-7 sm:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-[1.75rem]">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden rounded-[2rem] border border-brand-100 bg-white/80 p-5 shadow-[0_30px_60px_-15px_rgba(247,86,5,0.25)] backdrop-blur-xl lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative mb-6 flex items-center justify-between gap-3">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">লাইভ প্রজেক্ট প্রিভিউ</span>
              <span className="text-sm text-brand-100">প্রিমিয়াম ইউআই</span>
            </div>
            <h3 className="relative max-w-sm text-lg font-medium leading-snug tracking-[-0.01em] text-white">
              গ্রোথের জন্য তৈরি আধুনিক ওয়েবসাইট, ই-কমার্স স্টোর ও ম্যানেজমেন্ট সিস্টেম।
            </h3>
            <div className="relative mt-6 grid gap-3">
              {["মাদরাসা ম্যানেজমেন্ট", "ই-কমার্স স্টোর", "পোর্টফোলিও ও বিজনেস ওয়েবসাইট", "ল্যান্ডিং পেজ", "হোস্টিং ও ডোমেইন"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition hover:bg-white/15">
                  <span className="text-sm font-medium text-white">{item}</span>
                  <CheckCircle2 size={18} className="text-amber-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["দ্রুত ডেলিভারি", "রেসপনসিভ ডিজাইন", "SEO ফ্রেন্ডলি", "সিকিউর সেটআপ"].map((item) => (
              <div key={item} className="rounded-2xl border border-brand-100 bg-brand-50 p-4 transition hover:border-brand-200 hover:bg-brand-100/60">
                <span className="text-sm font-medium text-brand-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
