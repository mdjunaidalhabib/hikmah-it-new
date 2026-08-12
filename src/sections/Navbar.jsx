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
import { navItems } from "../data/siteData";
import useSiteSettings from "../lib/useSiteSettings";
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
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { user, loading: userLoading } = useUserAuth();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const allNavItems = [...navItems, { label: "আয় করুন", href: "/earn" }];

  return (
    <>
      {/* ── Header bar ── */}
      <header className="sticky top-0 z-50 bg-brand-600 shadow-md shadow-brand-950/20">
        <div className="mx-auto flex h-[60px] w-[min(1180px,calc(100%-40px))] items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="shrink-0" aria-label="Hikmah IT হোম">
            <Logo
              src={settings?.logoUrl}
              className={`h-16 w-[142px] shrink-0 object-contain object-left sm:h-48 sm:w-[155px] lg:h-[68px] lg:w-[167px] ${settingsLoading ? "invisible" : ""}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {allNavItems.map(({ href, label }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-1.5 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${
                    isActive
                      ? label === "আয় করুন"
                        ? "bg-white text-amber-600 shadow-sm shadow-black/10"
                        : "bg-white text-brand-700 shadow-sm shadow-black/10"
                      : label === "আয় করুন"
                        ? "text-amber-100 hover:bg-white/15 hover:text-white"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className={`hidden min-w-[190px] items-center justify-end gap-1.5 lg:flex ${userLoading ? "invisible" : ""}`}>
              {user ? (
                <Link
                  to="/profile"
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                >
                  <UserRound size={14} />
                  {user.name?.split(" ")[0]}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white"
                  >
                    লগইন
                  </Link>
                  <Button
                    href="/signup"
                    variant="white"
                    className="shrink-0 whitespace-nowrap"
                  >
                    সাইন আপ
                  </Button>
                </>
              )}
            </div>

            <Button
              href="/contact"
              variant="white"
              className="shrink-0 whitespace-nowrap"
            >
              ফ্রি জানুন
            </Button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="মেনু খুলুন"
              className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-700 shadow-md shadow-black/10 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer (LEFT side) ── */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[82vw] max-w-[320px] flex-col bg-brand-50 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-brand-100 px-4 py-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Hikmah IT হোম"
          >
            <Logo
              src={settings?.logoUrl}
              className={`h-8 w-[103px] shrink-0 object-contain object-left ${settingsLoading ? "invisible" : ""}`}
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="মেনু বন্ধ করুন"
            className="grid h-7 w-7 place-items-center rounded-lg border border-brand-200 bg-white text-slate-500 transition hover:border-brand-300 hover:bg-brand-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/50"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
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
                      `group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/50 ${
                        isActive
                          ? isEarn
                            ? "bg-amber-500 text-white shadow-sm shadow-amber-950/20"
                            : "bg-brand-600 text-white shadow-sm shadow-brand-950/20"
                          : isEarn
                            ? "text-amber-700 hover:bg-white/70 hover:text-amber-700"
                            : "text-slate-900 hover:bg-white/70 hover:text-brand-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Icon box */}
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-md transition ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isEarn
                                ? "bg-white text-amber-500 group-hover:bg-amber-100"
                                : "bg-white text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700"
                          }`}
                        >
                          <Icon size={14} />
                        </span>

                        <span className="flex-1">{label}</span>

                        {isEarn && !isActive && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold tracking-wide text-amber-700">
                            NEW
                          </span>
                        )}
                        {isEarn && isActive && (
                          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white">
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
        <div className="border-t border-brand-100 px-4 py-5">
          <div className="mb-3">
            {user ? (
              <Button
                href="/profile"
                variant="ghost-dark"
                className="w-full whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                <UserRound size={14} />
                আমার প্রোফাইল
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  href="/login"
                  variant="small"
                  className="w-full !px-2 whitespace-nowrap"
                  onClick={() => setOpen(false)}
                >
                  <LogIn size={14} />
                  লগইন
                </Button>
                <Button
                  href="/signup"
                  variant="small"
                  className="w-full !px-2 whitespace-nowrap"
                  onClick={() => setOpen(false)}
                >
                  <UserPlus size={14} />
                  সাইন আপ
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
