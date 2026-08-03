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
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

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
