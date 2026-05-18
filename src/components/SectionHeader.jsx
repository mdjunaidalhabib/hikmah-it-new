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
      } mb-8 max-w-3xl`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <span
          className={`${
            light
              ? "border-blue-300/30 bg-blue-500/10 text-blue-100"
              : "border-blue-200 bg-blue-100 text-blue-700"
          } inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide`}
        >
          {eyebrow}
        </span>
      )}

      {/* Title */}
      <h2
        className={`${
          light ? "text-white" : "text-slate-900"
        } mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl`}
      >
        {title}
      </h2>

      {/* Description */}
      {text && (
        <p
          className={`${
            light ? "text-slate-300" : "text-slate-600"
          } mt-3 text-base leading-7 sm:text-lg`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
