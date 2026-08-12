import SectionHeader from "../components/SectionHeader";
import { trustItems } from "../data/siteData";

export default function Trust() {
  return (
    <section className="bg-brand-50 py-8 lg:py-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="কেন আমাদের বেছে নেবেন"
          title="বিশ্বাস, পারফরম্যান্স ও গ্রোথের জন্য তৈরি"
          text="আমরা এমন প্রফেশনাল ওয়েবসাইট ও ম্যানেজমেন্ট সিস্টেম তৈরি করি যা দ্রুত, নির্ভরযোগ্য, মোবাইল-ফ্রেন্ডলি এবং ব্যবসা ও প্রতিষ্ঠানের আত্মবিশ্বাসী গ্রোথে সহায়ক।"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-4 ring-brand-50/50 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Icon size={22} />
              </span>
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
