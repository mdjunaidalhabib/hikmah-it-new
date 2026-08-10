import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, MessageSquare, Package, Users } from "lucide-react";
import { apiGet } from "../../lib/api";
import { AdminCard } from "../components/ui";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    pendingPurchases: 0,
    unreadMessages: 0,
    packages: 0,
    partners: 0,
  });

  useEffect(() => {
    (async () => {
      const [purchases, messages, packages, partners] = await Promise.all([
        apiGet("/admin/purchases?status=pending"),
        apiGet("/admin/contact?status=new"),
        apiGet("/admin/packages"),
        apiGet("/admin/partners"),
      ]);
      setCounts({
        pendingPurchases: purchases.length,
        unreadMessages: messages.length,
        packages: packages.length,
        partners: partners.length,
      });
    })();
  }, []);

  const tiles = [
    {
      label: "Pending Purchases",
      value: counts.pendingPurchases,
      icon: Wallet,
      href: "/admin/purchases",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "New Messages",
      value: counts.unreadMessages,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Total Packages",
      value: counts.packages,
      icon: Package,
      href: "/admin/packages",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Team & Partners",
      value: counts.partners,
      icon: Users,
      href: "/admin/partners",
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Quick overview of your website activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            to={href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <p className="mt-4 text-3xl font-black text-slate-900">{value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
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
