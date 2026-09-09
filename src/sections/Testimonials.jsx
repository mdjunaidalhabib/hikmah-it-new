import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Avatar from "../components/Avatar";
import { apiGet } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

export default function Testimonials({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    apiGet("/public/testimonials")
      .then((data) => setItems(category ? data.filter((t) => t.category === category) : data))
      .finally(() => setLoading(false));
  }, [category]);

  if (!loading && items.length === 0) return null;
  if (loading) return null;

  return (
    <section className="bg-brand-50 py-8 dark:bg-slate-900 lg:py-12" id="testimonials">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow={t("home.testimonials.eyebrow")}
          title={t("home.testimonials.title")}
          text={t("home.testimonials.text")}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-800 dark:shadow-black/20 dark:hover:border-brand-800/40"
            >
              <Quote className="absolute right-6 top-6 text-brand-100 dark:text-brand-500/20" size={40} strokeWidth={1.5} />

              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="relative mt-4 flex-1 leading-7 text-slate-700 dark:text-slate-200">&ldquo;{item.quote}&rdquo;</p>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <Avatar
                  name={item.name}
                  photo={item.photoUrl}
                  size="h-11 w-11"
                  iconSize={18}
                  className="border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  {item.role && <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
