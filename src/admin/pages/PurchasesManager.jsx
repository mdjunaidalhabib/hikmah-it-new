import { useEffect, useState } from "react";
import { Check, X, Trash2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiPatch, apiPost, apiDelete } from "../../lib/api";
import { AdminCard, EmptyState, StatusBadge } from "../components/ui";
import { SkeletonRow } from "../../components/Skeleton";
import { useConfirm } from "../context/ConfirmContext";

const tabs = [
  { key: "", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function PurchasesManager() {
  const confirm = useConfirm();
  const [purchases, setPurchases] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const load = async (status) => {
    setLoading(true);
    const data = await apiGet(`/admin/purchases${status ? `?status=${status}` : ""}`);
    setPurchases(data);
    setLoading(false);
  };

  useEffect(() => {
    load(tab);
  }, [tab]);

  const handleDelete = async (purchase) => {
    const ok = await confirm({ title: "অর্ডার ট্র্যাশে সরাবেন?", message: `"${purchase.packageNameSnapshot}" — ${purchase.customerName}`, confirmLabel: "ট্র্যাশে সরান" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/purchases/${purchase._id}`);
      await load(tab);
      toast.success("Order moved to trash");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ECMS অটো-প্রভিশনের ফলাফল toast + (ইমেইল না গেলে) পাসওয়ার্ড একবার দেখানো
  const reportProvision = (provision) => {
    if (!provision) return;
    if (!provision.ok) {
      toast.error(
        provision.revoke
          ? `ECMS শপ বন্ধ/ফেরানো যায়নি: ${provision.error}. শপ এখনো চালু আছে — "Retry ECMS" চাপুন।`
          : `ECMS শপ চালু হয়নি: ${provision.error}. পরে "Retry ECMS" চাপুন।`,
        { duration: 9000 }
      );
      return;
    }
    if (provision.revoke) {
      const msg = {
        suspended: "ECMS শপ সাসপেন্ড করা হয়েছে (ডেটা অক্ষত)",
        reverted: "ECMS প্ল্যান আগের অবস্থায় ফেরানো হয়েছে",
        already_revoked: "ECMS-এ আগেই বন্ধ/ফেরানো ছিল",
        not_applied: "ECMS-এ এই অর্ডার প্রয়োগই হয়নি — কিছু বদলায়নি",
      }[provision.result];
      toast.success(msg || "ECMS আপডেট হয়েছে");
      (provision.notes || []).forEach((n) => toast(n, { duration: 6000 }));
      return;
    }
    const label = { created: "নতুন ECMS শপ তৈরি হয়েছে", renewed: "ECMS প্ল্যান আপডেট/নবায়ন হয়েছে", already_processed: "ECMS-এ আগেই প্রয়োগ হয়েছিল" }[provision.result];
    toast.success(label || "ECMS প্রভিশন সম্পন্ন");
    (provision.notes || []).forEach((n) => toast(n, { duration: 6000 }));
    // পাসওয়ার্ড কখনো সিস্টেম থেকে দেখানো/পাঠানো হয় না — ইমেইল না গেলে শুধু জানানো
    if (provision.emailStatus === "failed" || provision.emailStatus === "skipped") {
      toast("কাস্টমারকে কনফার্মেশন ইমেইল পাঠানো যায়নি — হাতে জানিয়ে দিন (লগইন: তার দেওয়া ইমেইল ও পাসওয়ার্ড)", { duration: 8000 });
    }
  };

  const retryProvision = async (purchase) => {
    try {
      const path = purchase.status === "approved" ? "provision" : "revoke";
      const res = await apiPost(`/admin/purchases/${purchase._id}/${path}`, {});
      await load(tab);
      reportProvision(res.provision);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const decide = async (purchase, status) => {
    let adminNote = purchase.adminNote || "";
    if (status === "rejected" && purchase.status === "approved" && purchase.ecmsPlanKey) {
      const ok = await confirm({
        title: "অনুমোদিত ECMS অর্ডার বাতিল করবেন?",
        message: `"${purchase.packageNameSnapshot}" — ${purchase.customerName}\nনতুন তৈরি শপ সাসপেন্ড হবে (ডেটা মোছা হবে না); নবায়ন/আপগ্রেড হলে আগের প্ল্যানে ফিরবে। কাস্টমারকে ইমেইলে জানানো হবে।`,
        confirmLabel: "বাতিল ও ECMS বন্ধ করুন",
      });
      if (!ok) return;
    }
    if (status === "rejected") {
      adminNote = prompt("Optional note for rejection:", adminNote) ?? adminNote;
    }
    try {
      const res = await apiPatch(`/admin/purchases/${purchase._id}`, { status, adminNote });
      await load(tab);
      toast.success(status === "approved" ? "Purchase approved" : "Purchase rejected");
      reportProvision(res.provision);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Purchases</h1>
        <p className="mt-1 text-sm text-slate-500">Review payment submissions and approve or reject orders.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              tab === key
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AdminCard>
        {loading ? (
          <table className="w-full min-w-[860px] text-left text-sm">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={7} />
              ))}
            </tbody>
          </table>
        ) : purchases.length === 0 ? (
          <EmptyState text="No purchases found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-3">Package</th>
                  <th className="pb-2 pr-3">Customer</th>
                  <th className="pb-2 pr-3">Payment</th>
                  <th className="pb-2 pr-3">Referral</th>
                  <th className="pb-2 pr-3">Date</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p._id} className="border-b border-slate-50 align-top last:border-0">
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-slate-800">{p.packageNameSnapshot}</p>
                      <p className="text-slate-500">{p.priceSnapshot}</p>
                      {p.ecmsPlanKey && (
                        <p className="mt-1 text-xs font-semibold text-indigo-600">
                          ECMS · {p.ecmsPlanKey}
                          {p.shopName ? ` · ${p.shopName}` : ""}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <p className="font-medium text-slate-800">{p.customerName}</p>
                      <p className="text-slate-500">{p.customerPhone}</p>
                      {p.customerEmail && <p className="text-slate-500">{p.customerEmail}</p>}
                    </td>
                    <td className="py-3 pr-3">
                      <p className="text-slate-700">{p.paymentMethod}</p>
                      <p className="text-slate-500">From: {p.senderNumber}</p>
                      <p className="text-slate-500">TxnID: {p.transactionId}</p>
                    </td>
                    <td className="py-3 pr-3 text-slate-600">{p.referralCode || "—"}</td>
                    <td className="py-3 pr-3 text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-3">
                      <StatusBadge status={p.status} />
                      {p.adminNote && <p className="mt-1 max-w-[160px] text-xs text-slate-400">{p.adminNote}</p>}
                      {p.ecmsPlanKey && p.status !== "approved" && p.provisionStatus === "revoked" && (
                        <p className="mt-1 max-w-[180px] text-xs text-amber-600">
                          ECMS বন্ধ/ফেরানো হয়েছে{p.ecmsRevokeNote ? ` — ${p.ecmsRevokeNote}` : ""}
                        </p>
                      )}
                      {p.ecmsPlanKey && p.status !== "approved" && p.provisionStatus === "revoke_failed" && (
                        <p className="mt-1 max-w-[180px] text-xs text-red-600">
                          ECMS শপ এখনো চালু! বন্ধ করা যায়নি: {p.provisionError}
                        </p>
                      )}
                      {p.ecmsPlanKey && p.status === "approved" && (
                        <div className="mt-1 max-w-[180px] text-xs">
                          {p.provisionStatus === "done" && (
                            <p className="text-emerald-600">
                              ECMS ✓ {p.ecmsResult === "renewed" ? "নবায়ন" : "শপ চালু"}
                              {p.ecmsShopSlug ? ` (${p.ecmsShopSlug})` : ""}
                            </p>
                          )}
                          {p.provisionStatus === "pending" && <p className="text-amber-600">ECMS চলছে…</p>}
                          {(p.provisionStatus === "failed" || p.provisionStatus === "none") && (
                            <p className="text-red-600">ECMS ✗ {p.provisionError || "এখনো চালু হয়নি"}</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {p.status === "pending" && (
                          <>
                            <button
                              onClick={() => decide(p, "approved")}
                              className="rounded-lg bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
                              aria-label="Approve"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              onClick={() => decide(p, "rejected")}
                              className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                              aria-label="Reject"
                            >
                              <X size={15} />
                            </button>
                          </>
                        )}
                        {p.ecmsPlanKey && p.status === "approved" && (
                          <button
                            onClick={() => decide(p, "rejected")}
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            aria-label="Reject and suspend ECMS shop"
                            title="বাতিল করুন (ECMS শপ বন্ধ হবে)"
                          >
                            <X size={15} />
                          </button>
                        )}
                        {p.ecmsPlanKey && p.status === "rejected" && (
                          <button
                            onClick={() => decide(p, "approved")}
                            className="rounded-lg bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
                            aria-label="Re-approve"
                            title="আবার approve (ECMS শপ আবার চালু হবে)"
                          >
                            <Check size={15} />
                          </button>
                        )}
                        {p.ecmsPlanKey &&
                          ((p.status === "approved" && p.provisionStatus !== "done") ||
                            (p.status === "rejected" && p.provisionStatus === "revoke_failed")) && (
                          <button
                            onClick={() => retryProvision(p)}
                            className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100"
                            aria-label="Retry ECMS provisioning"
                            title="Retry ECMS"
                          >
                            <RefreshCw size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(p)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
