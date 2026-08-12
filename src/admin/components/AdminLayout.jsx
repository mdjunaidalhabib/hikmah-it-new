import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Wallet,
  Users,
  UserCog,
  MessageSquare,
  MessageSquareQuote,
  BellRing,
  Image,
  Wrench,
  Settings,
  Trash2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { ConfirmProvider } from "../context/ConfirmContext";
import Logo from "../../components/Logo";
import useSiteSettings from "../../lib/useSiteSettings";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/purchases", label: "Purchases", icon: Wallet },
  { to: "/admin/users", label: "Users", icon: UserCog },
  { to: "/admin/partners", label: "Team & Referral", icon: Users },
  { to: "/admin/messages", label: "Contact Messages", icon: MessageSquare },
  { to: "/admin/portfolio", label: "Portfolio", icon: Image },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/notifications", label: "Mail & SMS", icon: BellRing },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/trash", label: "Trash", icon: Trash2 },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <ConfirmProvider>
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 lg:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-brand-600 px-4 py-3 shadow-md shadow-brand-950/20 lg:hidden">
        <Logo
          src={settings?.logoUrl}
          className={`h-10 w-[129px] shrink-0 object-contain object-left sm:h-11 sm:w-[142px] ${settingsLoading ? "invisible" : ""}`}
        />
        <button
          onClick={() => setOpen(true)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-700 shadow-md shadow-black/10 transition hover:bg-brand-50"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar (fixed sliding drawer on mobile, static column on desktop) */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[82vw] max-w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:static lg:z-auto lg:h-auto lg:min-h-screen lg:w-64 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:border-r lg:border-slate-200 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
          <Logo
            src={settings?.logoUrl}
            className={`h-10 w-[129px] shrink-0 object-contain object-left sm:h-11 sm:w-[142px] ${settingsLoading ? "invisible" : ""}`}
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100 hover:text-red-700 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-3">
          <div className="mb-2 truncate px-3 text-xs text-slate-400">{admin?.email}</div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
    </ConfirmProvider>
  );
}
