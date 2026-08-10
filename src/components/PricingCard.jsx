import { CheckCircle2, XCircle } from "lucide-react";
import Button from "./Button";

export default function PricingCard({ plan }) {
  const { _id, name, price, period, text, features, notIncluded, limits, renewal, highlighted } = plan;
  const href = _id ? `/checkout/${_id}` : "/pricing";
  const label = _id ? "প্যাকেজ কিনুন" : "প্যাকেজ দেখুন";

  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.75rem] border p-7 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
        highlighted
          ? "border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 shadow-blue-950/10 ring-2 ring-blue-200 lg:-translate-y-2 lg:hover:-translate-y-2.5"
          : "border-slate-200 bg-white shadow-slate-950/5 hover:border-blue-200"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-slate-900 shadow-md shadow-amber-500/30">
          সুপারিশকৃত
        </span>
      )}

      <h3 className="text-xl font-bold text-slate-900">{name}</h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-3xl font-extrabold text-transparent">{price}</span>
        {period && <span className="text-sm font-medium text-slate-500">{period}</span>}
      </div>

      {renewal && <p className="mt-1 text-xs font-semibold text-slate-500">{renewal}</p>}

      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>

      {limits && limits.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {limits.map((limit) => (
            <span
              key={limit}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
            >
              {limit}
            </span>
          ))}
        </div>
      )}

      <ul className="my-6 grid gap-2.5 text-sm text-slate-700">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
            <span>{feature}</span>
          </li>
        ))}
        {notIncluded?.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-slate-400">
            <XCircle size={16} className="mt-0.5 shrink-0 text-slate-300" />
            <span className="line-through">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <Button
          href={href}
          variant={highlighted ? "primary" : "ghost-dark"}
          className="w-full"
        >
          {label}
        </Button>
      </div>
    </article>
  );
}
