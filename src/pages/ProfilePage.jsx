import { useEffect, useState } from "react";
import { Copy, LogOut, Mail, Share2, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { Skeleton, SkeletonRow } from "../components/Skeleton";
import { StatusBadge } from "../admin/components/ui";
import { useUserAuth } from "../context/UserAuthContext";
import { apiGet } from "../lib/api";

function formatDate(value) {
  return new Date(value).toLocaleDateString("bn-BD", { year: "numeric", month: "short", day: "numeric" });
}

export default function ProfilePage() {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGet("/user/me/orders"), apiGet("/user/me/referrals")])
      .then(([orderData, referralData]) => {
        setOrders(orderData);
        setReferrals(referralData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const copyReferralCode = () => {
    if (!referrals?.referralCode) return;
    navigator.clipboard?.writeText(referrals.referralCode);
    toast.success("রেফারেল কোড কপি হয়েছে");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#edf4ff] py-12 lg:py-16">
      <Seo title="আমার প্রোফাইল" description="আপনার অর্ডার ও রেফারেল ইনকাম দেখুন।" />
      <div className="mx-auto grid w-[min(1000px,calc(100%-40px))] gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Profile summary */}
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <h1 className="mt-4 text-xl font-bold text-slate-900">{user.name}</h1>

            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-slate-600">
                <Smartphone size={15} className="shrink-0" />
                <span className="min-w-0 flex-1 truncate">{user.mobile}</span>
                {user.mobileVerified ? (
                  <ShieldCheck size={14} className="shrink-0 text-emerald-500" />
                ) : (
                  <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-amber-600">ভেরিফাই করুন</span>
                )}
              </div>
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-slate-600">
                <Mail size={15} className="shrink-0" />
                <span className="min-w-0 flex-1 truncate">{user.email}</span>
                {user.emailVerified ? (
                  <ShieldCheck size={14} className="shrink-0 text-emerald-500" />
                ) : (
                  <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-amber-600">ভেরিফাই করুন</span>
                )}
              </div>
            </div>

            {!(user.emailVerified && user.mobileVerified) && (
              <Button href="/verify" variant="ghost-dark" className="mt-4 w-full">
                অ্যাকাউন্ট ভেরিফাই করুন
              </Button>
            )}

            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={15} /> লগ আউট
            </button>
          </div>

          {/* Referral card */}
          <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex items-center gap-2 text-emerald-700">
              <Share2 size={18} />
              <h3 className="font-bold">রেফারেল ইনকাম</h3>
            </div>

            {loading ? (
              <Skeleton className="mt-4 h-8 w-32" />
            ) : (
              <>
                <p className="mt-3 text-xs font-semibold text-emerald-700">আপনার রেফারেল কোড</p>
                <button
                  onClick={copyReferralCode}
                  className="mt-1 flex w-full items-center justify-between rounded-xl border border-emerald-200 bg-white px-4 py-3 text-left"
                >
                  <span className="text-lg font-bold text-slate-900">{referrals?.referralCode}</span>
                  <Copy size={15} className="text-emerald-600" />
                </button>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white px-3 py-2.5 text-center">
                    <p className="text-lg font-bold text-emerald-700">৳{(referrals?.totalEarned || 0).toLocaleString("bn-BD")}</p>
                    <p className="text-xs text-slate-500">মোট আয়</p>
                  </div>
                  <div className="rounded-xl bg-white px-3 py-2.5 text-center">
                    <p className="text-lg font-bold text-slate-900">{referrals?.approvedCount || 0}</p>
                    <p className="text-xs text-slate-500">সফল রেফার</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-emerald-800">
                  চেকআউটের সময় কাউকে আপনার কোড ব্যবহার করতে বলুন — অর্ডার কনফার্ম হলেই আপনি কমিশন পাবেন।
                </p>
              </>
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl lg:p-8">
          <div className="flex items-center gap-2 text-slate-900">
            <Wallet size={18} />
            <h2 className="text-lg font-bold">আমার অর্ডার</h2>
          </div>

          {/* Mobile: stacked cards */}
          <div className="mt-4 grid gap-3 sm:hidden">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
            ) : orders.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400">এখনো কোনো অর্ডার করেননি।</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="rounded-xl border border-slate-100 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate font-medium text-slate-800">{order.packageNameSnapshot}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>{order.priceSnapshot}</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop: table */}
          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-3">প্যাকেজ</th>
                  <th className="py-2 pr-3">মূল্য</th>
                  <th className="py-2 pr-3">তারিখ</th>
                  <th className="py-2 pr-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-slate-400">
                      এখনো কোনো অর্ডার করেননি।
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b border-slate-50 last:border-0">
                      <td className="py-3 pr-3 font-medium text-slate-800">{order.packageNameSnapshot}</td>
                      <td className="py-3 pr-3 text-slate-600">{order.priceSnapshot}</td>
                      <td className="py-3 pr-3 text-slate-500">{formatDate(order.createdAt)}</td>
                      <td className="py-3 pr-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && orders.length === 0 && (
            <Button href="/pricing" className="mt-4">
              প্যাকেজ দেখুন
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
