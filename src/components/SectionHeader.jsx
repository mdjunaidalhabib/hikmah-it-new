export default function SectionHeader({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}) {
  return (
    <div
      className={`${
        align === "left" ? "mx-0 text-left" : "mx-auto text-center"
      } mb-6 max-w-3xl`} // reduced from mb-10 → mb-6
    >
      {eyebrow && (
        <span
          className={`${
            light
              ? "border-blue-300/25 bg-blue-500/15 text-blue-100"
              : "border-blue-200 bg-blue-100 text-blue-700"
          } inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold`} // slightly reduced padding
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`${
          light ? "text-white" : "text-slate-950"
        } mt-2 text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl`} // mt-4 → mt-2
      >
        {title}
      </h2>

      {text && (
        <p
          className={`${
            light ? "text-slate-300" : "text-slate-600"
          } mt-2 text-base leading-7 sm:text-lg`} // mt-4 → mt-2
        >
          {text}
        </p>
      )}
    </div>
  );
}
