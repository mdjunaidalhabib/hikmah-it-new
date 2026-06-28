import {
  Menu,
  X,
  ArrowRight,
  Home,
  Wrench,
  CircleDollarSign,
  FolderKanban,
  Users,
  Info,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { navItems, brand } from "../data/siteData";

const iconMap = {
  "/": Home,
  "/services": Wrench,
  "/pricing": CircleDollarSign,
  "/portfolio": FolderKanban,
  "/team": Users,
  "/about": Info,
  "/earn": TrendingUp,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const allNavItems = [...navItems, { label: "Earn Money", href: "/earn" }];

  return (
    <>
      {/* ── Header bar ── */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-[#070f28]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] w-[min(1180px,calc(100%-40px))] items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {allNavItems.map(({ href, label }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500/20 text-emerald-300"
                      : "text-white/80 hover:bg-blue-500/15 hover:text-white"
                  } ${label === "Earn" ? "text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-200" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-blue-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <Button href="/contact" variant="small">
              Get Quote
            </Button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="relative grid h-9 w-9 place-items-center rounded-xl bg-blue-600/90 text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer (LEFT side) ── */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[82vw] max-w-[320px] flex-col bg-[#050d1e] border-r border-blue-500/10 shadow-2xl shadow-slate-950/80 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Right-side glow line on drawer edge */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />

        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-blue-500/10 px-5 py-4">
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
            Navigation
          </p>

          <ul className="space-y-0.5">
            {allNavItems.map(({ href, label }) => {
              const Icon = iconMap[href] || ArrowRight;
              const isEarn = label === "Earn";
              return (
                <li key={href}>
                  <NavLink
                    to={href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? isEarn
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-blue-500/20 text-blue-300"
                          : isEarn
                            ? "text-emerald-400/80 hover:bg-emerald-500/10 hover:text-emerald-300"
                            : "text-white/65 hover:bg-white/6 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active left accent bar */}
                        {isActive && (
                          <span
                            className={`absolute left-0 top-1/2 h-[55%] w-[3px] -translate-y-1/2 rounded-r-full ${
                              isEarn ? "bg-emerald-400" : "bg-blue-400"
                            }`}
                          />
                        )}

                        {/* Icon box */}
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                            isActive
                              ? isEarn
                                ? "bg-emerald-500/25 text-emerald-300"
                                : "bg-blue-500/30 text-blue-300"
                              : isEarn
                                ? "bg-emerald-500/10 text-emerald-500/70 group-hover:bg-emerald-500/15 group-hover:text-emerald-400"
                                : "bg-white/6 text-white/40 group-hover:bg-white/10 group-hover:text-white/70"
                          }`}
                        >
                          <Icon size={15} />
                        </span>

                        <span className="flex-1">{label}</span>

                        {isEarn && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold tracking-wide text-emerald-400">
                            NEW
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer CTA */}
        <div className="border-t border-blue-500/10 px-4 py-5">
          <Button href="/contact" variant="primary">
            Get a Free Quote
            <ArrowRight size={14} />
          </Button>

          <p className="mt-3 text-center text-[11px] text-slate-600">
            📞{" "}
            <a
              href={brand.phoneHref}
              className="text-slate-500 transition hover:text-white"
            >
              {brand.phone}
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
