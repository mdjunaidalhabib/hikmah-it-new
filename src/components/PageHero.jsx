export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-hero-light py-10">
      <div className="absolute inset-0 opacity-70 bg-grid-overlay" />
      <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {text && <p className="mt-4 text-sm text-slate-600 sm:text-base">{text}</p>}
        {children}
      </div>
    </section>
  );
}
