export default function SectionHeader({ eyebrow, title, text, align = "center" }) {
  return (
    <div className={`${align === "left" ? "mx-0 text-left" : "mx-auto text-center"} mb-8 max-w-3xl`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/20 dark:text-brand-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
          {eyebrow}
        </span>
      )}

      <h2 className="mt-3.5 text-xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-2xl lg:text-[2.1rem]">
        {title}
      </h2>

      {text && <p className="mt-3.5 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">{text}</p>}
    </div>
  );
}
