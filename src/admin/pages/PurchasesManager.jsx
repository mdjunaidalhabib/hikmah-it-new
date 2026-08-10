import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiPatch, apiDelete } from "../../lib/api";
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

  const decide = async (purchase, status) => {
    let adminNote = purchase.adminNote || "";
    if (status === "rejected") {
      adminNote = prompt("Optional note for rejection:", adminNote) ?? adminNote;
    }
    try {
      await apiPatch(`/admin/purchases/${purchase._id}`, { status, adminNote });
      await load(tab);
      toast.success(status === "approved" ? "Purchase approved" : "Purchase rejected");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6">
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
