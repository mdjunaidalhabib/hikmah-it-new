import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { ServiceCard } from "../components/Card";
import { SkeletonCard } from "../components/Skeleton";
import { workProcess } from "../data/siteData";
import Button from "../components/Button";
import { ArrowRight } from "lucide-react";
import { apiGet } from "../lib/api";
import { SERVICE_ICONS, DEFAULT_SERVICE_ICON } from "../lib/serviceIcons";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/public/services")
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#edf4ff] min-h-screen">
      <Seo
        title="আমাদের সার্ভিস"
        description="Hikmah IT-এর সার্ভিস দেখুন: ই-কমার্স ওয়েবসাইট, মাদরাসা ম্যানেজমেন্ট সিস্টেম, বিজনেস ওয়েবসাইট, পোর্টফোলিও সাইট, ল্যান্ডিং পেজ এবং হোস্টিং/ডোমেইন সাপোর্ট।"
      />
      <PageHero
        eyebrow="আমরা যা অফার করি"
        title="আমাদের সার্ভিস"
        text="ব্যবসা বা প্রতিষ্ঠানের যা যা প্রয়োজন — আধুনিক ওয়েবসাইট ও অনলাইন স্টোর থেকে শুরু করে প্রতিষ্ঠান ম্যানেজমেন্ট সিস্টেম এবং ডোমেইন/হোস্টিং সাপোর্ট পর্যন্ত।"
      />

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow="সব সার্ভিস"
            title="প্রফেশনাল দেখতে ও কার্যকরভাবে কাজ করে এমন ডিজিটাল সার্ভিস"
            text="প্রতিটি সার্ভিস বাস্তব ব্যবসার প্রয়োজন অনুযায়ী ডিজাইন করা: ক্লিন ইউআই, রেসপনসিভ লেআউট, কনভার্সন-ফোকাসড পেজ এবং অ্যাডমিন-রেডি ওয়ার্কফ্লো।"
          />
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">এখনো কোনো সার্ভিস যোগ করা হয়নি।</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  title={service.title}
                  text={service.text}
                  href={service.href}
                  icon={SERVICE_ICONS[service.iconName] || SERVICE_ICONS[DEFAULT_SERVICE_ICON]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader eyebrow="কাজের প্রক্রিয়া" title="সহজ, স্পষ্ট ও প্রজেক্ট-ফোকাসড ওয়ার্কফ্লো" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((item) => (
              <article key={item.step} className="rounded-3xl border border-slate-200 bg-[#edf4ff] p-6 shadow-lg shadow-slate-950/5 transition hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 font-bold text-white">{item.step}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="mx-auto w-[min(600px,calc(100%-40px))]">
          <h2 className="text-2xl font-bold text-slate-900">প্রজেক্ট শুরু করতে প্রস্তুত?</h2>
          <p className="mt-3 text-slate-600">আজই আমাদের সাথে যোগাযোগ করুন, আমরা আপনাকে সঠিক প্যাকেজ বেছে নিতে সাহায্য করব।</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">ফ্রি জানুন <ArrowRight size={16} /></Button>
            <Button href="/pricing" variant="ghost-dark">প্যাকেজ দেখুন</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
