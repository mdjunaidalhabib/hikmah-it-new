import { ArrowRight, MessageCircle, TrendingUp, CheckCircle, Zap, Users, DollarSign, Star } from "lucide-react";
import Button from "../components/Button";
import { joinRoles, brand } from "../data/siteData";

const steps = [
  {
    number: "01",
    title: "যোগাযোগ করুন",
    desc: "WhatsApp বা Contact ফর্মের মাধ্যমে আমাদের সাথে যুক্ত হন এবং পার্টনার হিসেবে রেজিস্ট্রেশন করুন।",
  },
  {
    number: "02",
    title: "ক্লায়েন্ট রেফার করুন",
    desc: "আপনার পরিচিত ব্যবসা, শিক্ষা প্রতিষ্ঠান বা যেকোনো অর্গানাইজেশনকে Hikmah IT-এর সার্ভিস সম্পর্কে জানান।",
  },
  {
    number: "03",
    title: "প্রজেক্ট কনফার্ম হলে",
    desc: "ক্লায়েন্টের প্রজেক্ট কনফার্ম ও পেমেন্ট হওয়ার পর আপনি নির্ধারিত কমিশন পাবেন।",
  },
  {
    number: "04",
    title: "কমিশন নিন",
    desc: "bKash / নগদ / ব্যাংকের মাধ্যমে সরাসরি আপনার কমিশন ট্রান্সফার করা হবে।",
  },
];

const perks = [
  { icon: DollarSign, label: "প্রতি রেফারেলে আয়" },
  { icon: Users, label: "নেটওয়ার্ক বাড়ান" },
  { icon: Zap, label: "কোনো টেকনিক্যাল স্কিল লাগবে না" },
  { icon: Star, label: "দ্রুত পেমেন্ট" },
  { icon: TrendingUp, label: "আনলিমিটেড আর্নিং" },
  { icon: CheckCircle, label: "বিশ্বস্ত পার্টনারশিপ" },
];

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-[#edf4ff]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_0%,#1d4ed8_0%,transparent_55%),linear-gradient(160deg,#071028_0%,#0b1736_50%,#172554_100%)] py-10 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]" />

        {/* floating glow blobs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-10 h-48 w-48 rounded-full bg-indigo-400/15 blur-2xl" />

        <div className="relative mx-auto w-[min(820px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
            💰 Referral Partner Program
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            রেফার করুন,{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              আয় করুন
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            Hikmah IT-এর পার্টনার হয়ে প্রতিটি সফল ক্লায়েন্ট রেফারেলের জন্য আকর্ষণীয় কমিশন উপার্জন করুন — কোনো টেকনিক্যাল স্কিল ছাড়াই।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>
              <MessageCircle size={16} />
              এখনই যোগ দিন
            </Button>
            <Button href="/contact" variant="ghost">
              আরও জানুন
              <ArrowRight size={16} />
            </Button>
          </div>

          {/* Quick stat strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { value: "৳500+", label: "প্রতি রেফারেলে" },
              { value: "৳20k+", label: "সর্বোচ্চ আয়" },
              { value: "24h", label: "পেমেন্ট টাইম" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-400 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Earn with us ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
              কেন আমাদের সাথে?
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              পার্টনারদের সুবিধাসমূহ
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {perks.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-slate-800 text-white shadow-md shadow-blue-900/20">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-semibold leading-tight text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Tiers ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
              Partner Tiers
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              আপনার পার্টনার ক্যাটাগরি বেছে নিন
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              আপনার নেটওয়ার্ক ও স্কিল অনুযায়ী তিনটি ক্যাটাগরিতে যোগ দিতে পারবেন।
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {joinRoles.map((role, i) => (
              <article
                key={role.role}
                className={`relative overflow-hidden rounded-[2rem] border p-8 transition hover:-translate-y-1 hover:shadow-2xl ${
                  i === 1
                    ? "border-blue-400 bg-gradient-to-b from-[#071028] to-[#0f2150] text-white shadow-xl shadow-blue-950/30"
                    : "border-slate-200 bg-white shadow-lg"
                }`}
              >
                {i === 1 && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                    Most Popular
                  </span>
                )}

                <div className="text-4xl">{role.icon}</div>

                <h3 className={`mt-4 text-xl font-extrabold ${i === 1 ? "text-white" : "text-slate-900"}`}>
                  {role.role}
                </h3>

                <p className={`mt-3 leading-7 text-sm ${i === 1 ? "text-slate-300" : "text-slate-500"}`}>
                  {role.desc}
                </p>

                <div
                  className={`mt-6 rounded-xl border px-4 py-3 ${
                    i === 1 ? "border-blue-400/40 bg-blue-500/25" : "border-blue-100 bg-blue-50"
                  }`}
                >
                  <p className={`text-sm font-bold ${i === 1 ? "text-blue-200" : "text-blue-700"}`}>
                    💰 {role.earn}
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    href={brand.whatsapp}
                    variant={i === 1 ? "ghost" : "ghost-dark"}
                  >
                    যোগ দিন
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto w-[min(900px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
              প্রক্রিয়া
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              কিভাবে আয় করবেন?
            </h2>
          </div>

          <div className="relative space-y-4">
            {/* vertical line */}
            <div className="absolute left-[28px] top-10 h-[calc(100%-80px)] w-px bg-blue-200 lg:left-1/2 lg:-translate-x-px hidden sm:block" />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md lg:w-[calc(50%-28px)] ${
                  i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-slate-800 text-sm font-black text-white shadow-md shadow-blue-900/25">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#071028] to-[#0b1736] py-16 text-white lg:py-20">
        <div className="mx-auto w-[min(700px,calc(100%-40px))] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-200">
            🚀 শুরু করুন আজই
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            পার্টনার হিসেবে যোগ দিন
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            আজই আমাদের সাথে যোগ দিন এবং আপনার নেটওয়ার্ককে আয়ের সুযোগে পরিণত করুন।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={brand.whatsapp}>
              <MessageCircle size={16} />
              WhatsApp-এ যোগ দিন
            </Button>
            <Button href="/contact" variant="ghost">
              Contact করুন
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
