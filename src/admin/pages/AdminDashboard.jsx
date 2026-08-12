import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, MessageSquare, Package, Users, UserCog, ShieldCheck, ShieldAlert } from "lucide-react";
import { apiGet } from "../../lib/api";
import { AdminCard } from "../components/ui";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    pendingPurchases: 0,
    unreadMessages: 0,
    packages: 0,
    partners: 0,
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
  });

  useEffect(() => {
    (async () => {
      const [purchases, messages, packages, partners, users] = await Promise.all([
        apiGet("/admin/purchases?status=pending"),
        apiGet("/admin/contact?status=new"),
        apiGet("/admin/packages"),
        apiGet("/admin/partners"),
        apiGet("/admin/users"),
      ]);
      const verifiedUsers = users.filter((u) => u.emailVerified && u.mobileVerified).length;
      setCounts({
        pendingPurchases: purchases.length,
        unreadMessages: messages.length,
        packages: packages.length,
        partners: partners.length,
        totalUsers: users.length,
        verifiedUsers,
        unverifiedUsers: users.length - verifiedUsers,
      });
    })();
  }, []);

  const tiles = [
    {
      label: "Total Users",
      value: counts.totalUsers,
      icon: UserCog,
      href: "/admin/users",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Verified Users",
      value: counts.verifiedUsers,
      icon: ShieldCheck,
      href: "/admin/users",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Unverified Users",
      value: counts.unverifiedUsers,
      icon: ShieldAlert,
      href: "/admin/users",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      label: "Pending Purchases",
      value: counts.pendingPurchases,
      icon: Wallet,
      href: "/admin/purchases",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      label: "New Messages",
      value: counts.unreadMessages,
      icon: MessageSquare,
      href: "/admin/messages",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      label: "Total Packages",
      value: counts.packages,
      icon: Package,
      href: "/admin/packages",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      label: "Team & Partners",
      value: counts.partners,
      icon: Users,
      href: "/admin/partners",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Quick overview of your website activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {tiles.map(({ label, value, icon: Icon, href, gradient }) => (
          <Link
            key={label}
            to={href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
          >
            <div
              className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-10 transition group-hover:opacity-20 ${gradient}`}
            />
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md sm:h-11 sm:w-11 ${gradient}`}>
              <Icon size={18} />
            </div>
            <p className="mt-3 text-2xl font-black text-slate-900 sm:mt-4 sm:text-3xl">{value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          </Link>
        ))}
      </div>

      <AdminCard title="Getting started">
        <ul className="grid gap-2 text-sm text-slate-600">
          <li>• Add your packages under <strong>Packages</strong> so they appear on the public pricing page.</li>
          <li>• Review and approve incoming orders under <strong>Purchases</strong>.</li>
          <li>• Add team/referral partners under <strong>Team & Referral</strong>.</li>
          <li>• Set your logo, contact info and payment numbers under <strong>Site Settings</strong>.</li>
        </ul>
      </AdminCard>
    </div>
  );
}
