export default function Button({
  href = "#contact",
  children,
  variant = "primary",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition duration-300 hover:-translate-y-0.5";

  const styles = {
    primary:
      "border-blue-600 bg-blue-600 px-6 py-3 text-sm text-white shadow-lg shadow-blue-950/20 hover:bg-blue-700",
    small:
      "border-blue-600 bg-blue-600 px-3.5 py-2 text-xs text-white shadow-md shadow-blue-950/20 hover:bg-blue-700",
    ghost:
      "border-white/20 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/15",
    "ghost-dark":
      "border-slate-200 bg-white px-6 py-3 text-sm text-slate-900 hover:border-blue-200 hover:text-blue-700",
  };

  return (
    <a className={`${base} ${styles[variant] || styles.primary}`} href={href}>
      {children}
    </a>
  );
}
