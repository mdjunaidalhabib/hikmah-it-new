export default function SectionHeader({ eyebrow, title, text, align = "center" }) {
  return (
    <div className={`${align === "left" ? "mx-0 text-left" : "mx-auto text-center"} mb-8 max-w-3xl`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          {eyebrow}
        </span>
      )}

      <h2 className="mt-3.5 text-xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-2xl lg:text-[2.1rem]">
        {title}
      </h2>

      {text && <p className="mt-3.5 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{text}</p>}
    </div>
  );
}
