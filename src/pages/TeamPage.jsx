import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ExternalLink, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { SkeletonCard } from "../components/Skeleton";
import { joinRoles, brand } from "../data/siteData";
import { apiGet } from "../lib/api";
import useSiteSettings from "../lib/useSiteSettings";

function Avatar({ name, photo, size = "h-24 w-24", textSize = "text-2xl" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`mx-auto ${size} rounded-full object-cover border-4 border-white shadow-lg shadow-blue-900/10`}
      />
    );
  }

  return (
    <div
      className={`mx-auto flex ${size} items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 ${textSize} font-bold text-white shadow-lg shadow-blue-900/20`}
    >
      {initials}
    </div>
  );
}

export default function TeamPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = useSiteSettings();
  const founder = settings?.founder;

  useEffect(() => {
    apiGet("/public/partners")
      .then(setPartners)
      .finally(() => setLoading(false));
  }, []);

  if (settings && settings.sectionVisibility?.team === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#edf4ff]">
      <Seo
        title="আমাদের টিম ও রেফারেল পার্টনার"
        description="Hikmah IT-এর টিম এবং মার্কেটিং/রেফারেল পার্টনারদের সাথে পরিচিত হন যারা ব্যবসাকে আমাদের ওয়েব ডেভেলপমেন্ট ও সফটওয়্যার সার্ভিস সম্পর্কে জানাতে সাহায্য করেন।"
      />
      <PageHero
        eyebrow="মার্কেটিং পার্টনার"
        title="আমাদের টিম ও রেফারেল পার্টনার"
        text="আমাদের মার্কেটিং ও রেফারেল পার্টনারদের সাথে পরিচিত হন, যারা সফল ক্লায়েন্ট রেফারেলের মাধ্যমে কমিশন আয় করার পাশাপাশি ব্যবসা ও প্রতিষ্ঠানকে Hikmah IT সলিউশন সম্পর্কে জানাতে সাহায্য করেন।"
      />

      {/* Owner */}
      {founder?.name && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-[min(900px,calc(100%-40px))]">
            <div className="rounded-[2rem] border border-blue-200 bg-white p-8 shadow-2xl shadow-blue-950/10">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <Avatar name={founder.name} photo={founder.photoUrl} size="h-28 w-28" textSize="text-3xl" />

                <div className="text-center sm:text-left">
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                    {founder.role}
                  </span>

                  <h2 className="mt-2 text-2xl font-medium text-slate-900">{founder.name}</h2>

                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-500 sm:justify-start">
                    <MapPin size={14} />
                    {founder.location}
                  </p>

                  <p className="mt-3 leading-7 text-slate-600">{founder.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(founder.skills || []).map((skill) => (
                      <span key={skill} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button href={founder.whatsapp}>
                      <MessageCircle size={16} />
                      WhatsApp
                    </Button>

                    <Button href={founder.facebook} variant="ghost-dark">
                      <ExternalLink size={16} />
                      ফেসবুক
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Marketing Partners */}
      <section className="pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeader
            eyebrow="মার্কেটিং পার্টনার"
            title="আমাদের রেফারেল ও মার্কেটিং টিম"
            text="আমাদের পার্টনাররা মার্কেটিং, রেফারেল এবং বিজনেস ডেভেলপমেন্ট কার্যক্রমের মাধ্যমে ব্যবসা ও প্রতিষ্ঠানকে Hikmah IT সার্ভিস সম্পর্কে জানাতে সাহায্য করেন এবং সফল প্রজেক্ট থেকে কমিশন আয় করেন।"
          />

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : partners.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">এখনো কোনো পার্টনার যোগ করা হয়নি।</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((member) => (
                <article
                  key={member._id}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Avatar name={member.name} photo={member.photoUrl} />

                  <h3 className="mt-4 text-xl font-bold text-slate-900">{member.name}</h3>

                  <p className="mt-1 text-sm font-semibold text-blue-600">{member.role}</p>

                  {member.location && (
                    <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      {member.location}
                    </p>
                  )}

                  {member.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.earningText && (
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2">
                      <span className="text-xs font-semibold text-emerald-700">💰 মোট আয়: {member.earningText}</span>
                    </div>
                  )}

                  <div className="mt-4 flex justify-center gap-3">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}-এর ফেসবুক প্রোফাইল`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}

                    {member.whatsapp && (
                      <a
                        href={member.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}-কে WhatsApp-এ মেসেজ করুন`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50"
                      >
                        <MessageCircle size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Earn Through Referrals */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700">
              পার্টনার প্রোগ্রাম
            </span>

            <h2 className="mt-4 text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              রেফারেলের মাধ্যমে আয় করুন
            </h2>

            <p className="mt-3 text-base text-slate-600">প্রতিটি সফল প্রজেক্টের জন্য Hikmah IT-তে ক্লায়েন্ট রেফার করুন এবং কমিশন আয় করুন।</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {joinRoles.map((role) => (
              <article key={role.role} className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-7 transition hover:bg-blue-50">
                <div className="text-4xl">{role.icon}</div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">{role.role}</h3>

                <p className="mt-3 text-slate-600">{role.desc}</p>

                <div className="mt-5 rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-700">
                  💰 কমিশন সুযোগ: {role.earn}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={brand.whatsapp}>
                <MessageCircle size={16} />
                WhatsApp-এ যোগ দিন
              </Button>

              <Button href="/contact" variant="ghost-dark">
                যোগাযোগ করুন
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
