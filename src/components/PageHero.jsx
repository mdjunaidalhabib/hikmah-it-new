export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-hero-navy py-10 text-white">
      <div className="absolute inset-0 opacity-15 bg-grid-overlay" />
      <div className="relative mx-auto w-[min(900px,calc(100%-40px))] text-center">
        <span className="inline-flex items-center rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {text && <p className="mt-4 text-lg text-slate-300">{text}</p>}
        {children}
      </div>
    </section>
  );
}
