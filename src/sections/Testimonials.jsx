import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { apiGet } from "../lib/api";

export default function Testimonials({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/public/testimonials")
      .then((data) => setItems(category ? data.filter((t) => t.category === category) : data))
      .finally(() => setLoading(false));
  }, [category]);

  if (!loading && items.length === 0) return null;
  if (loading) return null;

  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12" id="testimonials">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="ক্লায়েন্ট রিভিউ"
          title="আমাদের ক্লায়েন্টরা যা বলেন"
          text="বাস্তব ক্লায়েন্টদের অভিজ্ঞতা।"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl"
            >
              <Quote className="absolute right-6 top-6 text-blue-100" size={40} strokeWidth={1.5} />

              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="relative mt-4 flex-1 leading-7 text-slate-700">&ldquo;{item.quote}&rdquo;</p>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-slate-950 text-sm font-bold text-white">
                    {item.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  {item.role && <p className="text-sm text-slate-500">{item.role}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
