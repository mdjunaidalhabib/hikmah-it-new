import { Link } from "react-router-dom";

const cardClass =
  "group relative overflow-hidden rounded-3xl border border-slate-800/10 bg-white p-7 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-950/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/50";

const glowClass =
  "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition duration-500 group-hover:bg-brand-500/10";

const iconClass =
  "relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-950/20 ring-4 ring-brand-50 transition duration-300 group-hover:scale-105 group-hover:ring-brand-100";

export function FeatureCard({ icon: Icon, title, text }) {
  return (
    <article className={cardClass}>
      <span className={glowClass} />
      <div className={iconClass}>{Icon && <Icon size={24} />}</div>

      <h3 className="relative mb-2 text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h3>

      <p className="relative leading-7 text-slate-600">{text}</p>
    </article>
  );
}

export function ServiceCard({ icon: Icon, title, text, href }) {
  return (
    <Link className={cardClass} to={href}>
      <span className={glowClass} />
      <div className={iconClass}>{Icon && <Icon size={26} />}</div>

      <h3 className="relative mb-2 text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h3>

      <p className="relative leading-7 text-slate-600">{text}</p>

      <span className="relative mt-5 inline-flex items-center gap-1 font-semibold text-brand-700 transition group-hover:gap-2 group-hover:underline">
        বিস্তারিত দেখুন →
      </span>
    </Link>
  );
}
