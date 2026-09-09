export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-hero-light py-10">
      <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
      <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
        <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 dark:border-brand-800/40 dark:bg-brand-500/10 dark:text-brand-400">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {text && <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 sm:text-base">{text}</p>}
        {children}
      </div>
    </section>
  );
}
