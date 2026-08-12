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
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Logo
          src={settings?.logoUrl}
          className={`h-10 w-[129px] shrink-0 object-contain object-left sm:h-11 sm:w-[142px] lg:h-12 lg:w-[155px] ${settingsLoading ? "invisible" : ""}`}
        />
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <aside
        className={`${open ? "block" : "hidden"} w-full border-b border-slate-200 bg-white lg:block lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r`}
      >
        <div className="hidden items-center gap-2 border-b border-slate-100 px-5 py-5 lg:flex">
          <Logo
            src={settings?.logoUrl}
            className={`h-10 w-[129px] shrink-0 object-contain object-left sm:h-11 sm:w-[142px] lg:h-12 lg:w-[155px] ${settingsLoading ? "invisible" : ""}`}
          />
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
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

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
    </ConfirmProvider>
  );
}
