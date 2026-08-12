import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { ServiceCard } from "../components/Card";
import { apiGet } from "../lib/api";
import { SERVICE_ICONS, DEFAULT_SERVICE_ICON } from "../lib/serviceIcons";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/public/services")
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && services.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-brand-50 py-8 lg:py-12" id="services">
      <div className="pointer-events-none absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 right-[-8%] h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="আমাদের সার্ভিস"
          title="প্রফেশনাল ও কার্যকর ডিজিটাল সার্ভিস"
          text="প্রতিটি সার্ভিস তৈরি করা হয়েছে বাস্তব ব্যবসার প্রয়োজন অনুযায়ী: ক্লিন ইউআই, রেসপনসিভ লেআউট, কনভার্সন-ফোকাসড পেজ এবং অ্যাডমিন-রেডি ওয়ার্কফ্লো।"
        />
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
      </div>
    </section>
  );
}
