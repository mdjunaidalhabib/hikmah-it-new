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
  UserRound,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { navItems, brand } from "../data/siteData";
import useSiteSettings from "../lib/useSiteSettings";
import { SECTION_HREF_MAP, isSectionVisible } from "../lib/sectionVisibility";
import { useUserAuth } from "../context/UserAuthContext";

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
  const settings = useSiteSettings();
  const { user, loading } = useUserAuth();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const allNavItems = [...navItems, { label: "আয় করুন", href: "/earn" }].filter(
    (item) => !SECTION_HREF_MAP[item.href] || isSectionVisible(settings, SECTION_HREF_MAP[item.href])
  );

  return (
    <>
      {/* ── Header bar ── */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 via-blue-100/90 to-blue-50 shadow-sm shadow-blue-950/10 backdrop-blur-xl border-b border-blue-200/80">
        <div className="mx-auto flex h-[60px] w-[min(1180px,calc(100%-40px))] items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="shrink-0" aria-label="Hikmah IT হোম">
            <Logo src={settings?.logoUrl} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {allNavItems.map(({ href, label }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `relative rounded-xl px-3.5 py-2 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 ${
                    isActive
                      ? label === "আয় করুন"
                        ? "bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-sm shadow-amber-600/30"
                        : "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-sm shadow-blue-950/25"
                      : label === "আয় করুন"
                        ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                        : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {!loading && (
              <div className="hidden items-center gap-1.5 lg:flex">
                {user ? (
                  <Link
                    to="/profile"
                    className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    <UserRound size={15} />
                    {user.name?.split(" ")[0]}
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      লগইন
                    </Link>
                    <Button href="/signup" variant="small" className="shrink-0 whitespace-nowrap">
                      সাইন আপ
                    </Button>
                  </>
                )}
              </div>
            )}

            <Button href="/contact" variant="small" className="shrink-0 whitespace-nowrap">
              ফ্রি জানুন
            </Button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="মেনু খুলুন"
              className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-950/25 transition hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer (LEFT side) ── */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[82vw] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
          <Link to="/" onClick={() => setOpen(false)} aria-label="Hikmah IT হোম">
            <Logo src={settings?.logoUrl} />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="মেনু বন্ধ করুন"
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            নেভিগেশন
          </p>

          <ul className="space-y-0.5">
            {allNavItems.map(({ href, label }) => {
              const Icon = iconMap[href] || ArrowRight;
              const isEarn = label === "আয় করুন";
              return (
                <li key={href}>
                  <NavLink
                    to={href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 ${
                        isActive
                          ? isEarn
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                          : isEarn
                            ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active left accent bar */}
                        {isActive && (
                          <span
                            className={`absolute left-0 top-1/2 h-[55%] w-[3px] -translate-y-1/2 rounded-r-full ${
                              isEarn ? "bg-amber-500" : "bg-blue-600"
                            }`}
                          />
                        )}

                        {/* Icon box */}
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                            isActive
                              ? isEarn
                                ? "bg-amber-100 text-amber-600"
                                : "bg-blue-100 text-blue-600"
                              : isEarn
                                ? "bg-amber-50 text-amber-500 group-hover:bg-amber-100"
                                : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                          }`}
                        >
                          <Icon size={15} />
                        </span>

                        <span className="flex-1">{label}</span>

                        {isEarn && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold tracking-wide text-amber-700">
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
        <div className="border-t border-slate-100 px-4 py-5">
          {!loading && (
            <div className="mb-3">
              {user ? (
                <Button href="/profile" variant="ghost-dark" className="w-full whitespace-nowrap" onClick={() => setOpen(false)}>
                  <UserRound size={14} />
                  আমার প্রোফাইল
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button href="/login" variant="small" className="w-full !px-2 whitespace-nowrap" onClick={() => setOpen(false)}>
                    <LogIn size={14} />
                    লগইন
                  </Button>
                  <Button href="/signup" variant="small" className="w-full !px-2 whitespace-nowrap" onClick={() => setOpen(false)}>
                    <UserPlus size={14} />
                    সাইন আপ
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button href="/contact" variant="primary">
            ফ্রি জানুন
            <ArrowRight size={14} />
          </Button>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            📞{" "}
            <a href={brand.phoneHref} className="text-slate-500 transition hover:text-blue-600">
              {brand.phone}
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
