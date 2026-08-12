import { Link } from "react-router-dom";

export default function Button({
  href = "/contact",
  children,
  variant = "primary",
  external = false,
  type,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

  const styles = {
    primary:
      "border-brand-700 bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-3 text-sm text-white shadow-lg shadow-brand-950/25 hover:shadow-xl hover:shadow-brand-600/30 hover:from-brand-400 hover:to-brand-600",
    small:
      "border-brand-700 bg-gradient-to-b from-brand-500 to-brand-600 px-3.5 py-2 text-xs text-white shadow-md shadow-brand-950/25 hover:shadow-lg hover:shadow-brand-600/30",
    ghost:
      "border-white/20 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm hover:bg-white/15",
    "ghost-dark":
      "border-slate-200 bg-white px-6 py-3 text-sm text-slate-900 shadow-sm hover:border-brand-300 hover:text-brand-700 hover:shadow-md",
    white:
      "border-white bg-white px-3.5 py-2 text-xs text-brand-700 shadow-md shadow-black/10 hover:bg-brand-50",
  };

  const cls = `${base} ${styles[variant] || styles.primary} ${className}`;

  if (type === "submit" || type === "button") {
    return (
      <button type={type} className={cls} {...rest}>
        {children}
      </button>
    );
  }

  if (external || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto") || href.startsWith("https://wa")) {
    return (
      <a className={cls} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} to={href} {...rest}>
      {children}
    </Link>
  );
}
