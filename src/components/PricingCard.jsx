import { CheckCircle2, XCircle } from "lucide-react";
import Button from "./Button";
import { formatTaka, getDisplayPrice, getDiscountPercent } from "../lib/pricing";

export default function PricingCard({ plan }) {
  const { _id, name, originalPriceAmount, periodLabel, text, features, notIncluded, limits, renewalText, highlighted } = plan;
  const href = _id ? `/checkout/${_id}` : "/pricing";
  const label = _id ? "প্যাকেজ কিনুন" : "প্যাকেজ দেখুন";
  const price = getDisplayPrice(plan);
  const discountPercent = getDiscountPercent(plan);

  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.75rem] border p-7 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
        highlighted
          ? "border-brand-300 bg-gradient-to-br from-white via-brand-50 to-amber-50 shadow-brand-950/10 ring-2 ring-brand-200 lg:-translate-y-2 lg:hover:-translate-y-2.5"
          : "border-slate-200 bg-white shadow-slate-950/5 hover:border-brand-200"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-slate-900 shadow-md shadow-amber-500/30">
          সুপারিশকৃত
        </span>
      )}

      <h3 className="text-xl font-bold text-slate-900">{name}</h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-3xl font-extrabold text-transparent">{price}</span>
        {periodLabel && <span className="text-sm font-medium text-slate-500">{periodLabel}</span>}
      </div>

      {discountPercent > 0 && (
        <p className="mt-1 text-sm text-slate-400">
          <span className="line-through">{formatTaka(originalPriceAmount)}</span>{" "}
          <span className="font-semibold text-emerald-600">{discountPercent}% ছাড়</span>
        </p>
      )}

      {renewalText && <p className="mt-1 text-xs font-semibold text-slate-500">{renewalText}</p>}

      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>

      {limits && limits.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {limits.map((limit) => (
            <span
              key={limit}
              className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
            >
              {limit}
            </span>
          ))}
        </div>
      )}

      <ul className="my-6 grid gap-2.5 text-sm text-slate-700">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
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
