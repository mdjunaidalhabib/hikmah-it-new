import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Trash2, Users2, Wallet, MessageSquare, Package, CreditCard, Wrench, Image, Handshake, MessageSquareQuote } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiPost, apiDelete } from "../../lib/api";
import { AdminCard, EmptyState } from "../components/ui";
import { SkeletonRow } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";

const typeMeta = {
  user: { label: "User", icon: Users2, styles: "border-blue-200 bg-blue-50 text-blue-700" },
  order: { label: "Order", icon: Wallet, styles: "border-amber-200 bg-amber-50 text-amber-700" },
  message: { label: "Message", icon: MessageSquare, styles: "border-purple-200 bg-purple-50 text-purple-700" },
  package: { label: "Package", icon: Package, styles: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  service: { label: "Service", icon: Wrench, styles: "border-cyan-200 bg-cyan-50 text-cyan-700" },
  portfolio: { label: "Portfolio", icon: Image, styles: "border-indigo-200 bg-indigo-50 text-indigo-700" },
  partner: { label: "Team & Referral", icon: Handshake, styles: "border-rose-200 bg-rose-50 text-rose-700" },
  testimonial: { label: "Testimonial", icon: MessageSquareQuote, styles: "border-orange-200 bg-orange-50 text-orange-700" },
  paymentNumber: { label: "Payment Number", icon: CreditCard, styles: "border-slate-300 bg-slate-100 text-slate-700" },
};

const filterTabs = [
  { key: "", label: "All" },
  { key: "user", label: "Users" },
  { key: "order", label: "Orders" },
  { key: "message", label: "Messages" },
  { key: "package", label: "Packages" },
  { key: "service", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
  { key: "partner", label: "Team & Referral" },
  { key: "testimonial", label: "Testimonials" },
  { key: "paymentNumber", label: "Payment Numbers" },
];

const keyOf = (item) => `${item.type}:${item.id}`;

function TypeBadge({ type }) {
  const meta = typeMeta[type];
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${meta.styles}`}>
      <Icon size={12} /> {meta.label}
    </span>
  );
}

export default function TrashPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/trash");
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => (filter ? items.filter((item) => item.type === filter) : items), [items, filter]);

  useEffect(() => {
    setSelected(new Set());
  }, [filter]);

  const allVisibleSelected = visible.length > 0 && visible.every((item) => selected.has(keyOf(item)));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visible.map(keyOf)));
    }
  };

  const toggleSelect = (item) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const key = keyOf(item);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleRestore = async (item) => {
    setBusyId(item.id);
    try {
      await apiPost(`/admin/trash/${item.type}/${item.id}/restore`, {});
      setItems((prev) => prev.filter((i) => !(i.type === item.type && i.id === item.id)));
      toast.success("Restored");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handlePermanentDelete = async (item) => {
    const ok = await confirm({ title: "স্থায়ীভাবে ডিলিট করবেন?", message: `"${item.title}" — এটা আর ফিরিয়ে আনা যাবে না।`, confirmLabel: "স্থায়ীভাবে ডিলিট করুন" });
    if (!ok) return;
    setBusyId(item.id);
    try {
      await apiDelete(`/admin/trash/${item.type}/${item.id}`);
      setItems((prev) => prev.filter((i) => !(i.type === item.type && i.id === item.id)));
      toast.success("Permanently deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const runBulk = async (targets, action) => {
    setBulkBusy(true);
    const results = await Promise.allSettled(targets.map((item) => action(item)));
    const okKeys = new Set();
    let failed = 0;
    results.forEach((res, i) => {
      if (res.status === "fulfilled") okKeys.add(keyOf(targets[i]));
      else failed += 1;
    });
    setItems((prev) => prev.filter((i) => !okKeys.has(keyOf(i))));
    setSelected(new Set());
    setBulkBusy(false);
    return { succeeded: okKeys.size, failed };
  };

  const handleBulkRestore = async () => {
    const targets = visible.filter((item) => selected.has(keyOf(item)));
    if (targets.length === 0) return;
    const ok = await confirm({ title: "নির্বাচিত আইটেম রিস্টোর করবেন?", message: `${targets.length}টি আইটেম রিস্টোর হবে।`, confirmLabel: "রিস্টোর করুন", danger: false });
    if (!ok) return;
    const { succeeded, failed } = await runBulk(targets, (item) => apiPost(`/admin/trash/${item.type}/${item.id}/restore`, {}));
    if (succeeded) toast.success(`Restored ${succeeded} item(s)`);
    if (failed) toast.error(`Failed to restore ${failed} item(s)`);
  };

  const handleBulkDelete = async () => {
    const targets = visible.filter((item) => selected.has(keyOf(item)));
    if (targets.length === 0) return;
    const ok = await confirm({ title: "নির্বাচিত আইটেম স্থায়ীভাবে ডিলিট করবেন?", message: `${targets.length}টি আইটেম চিরতরে মুছে যাবে — ফিরিয়ে আনা যাবে না।`, confirmLabel: "স্থায়ীভাবে ডিলিট করুন" });
    if (!ok) return;
    const { succeeded, failed } = await runBulk(targets, (item) => apiDelete(`/admin/trash/${item.type}/${item.id}`));
    if (succeeded) toast.success(`Permanently deleted ${succeeded} item(s)`);
    if (failed) toast.error(`Failed to delete ${failed} item(s)`);
  };

  const handleDeleteAll = async () => {
    if (visible.length === 0) return;
    const scope = filter ? typeMeta[filter]?.label || filter : "সব";
    const ok = await confirm({ title: "সব ডিলিট করবেন?", message: `"${scope}" ট্র্যাশের ${visible.length}টি আইটেম চিরতরে মুছে যাবে — ফিরিয়ে আনা যাবে না।`, confirmLabel: "সব ডিলিট করুন" });
    if (!ok) return;
    const { succeeded, failed } = await runBulk(visible, (item) => apiDelete(`/admin/trash/${item.type}/${item.id}`));
    if (succeeded) toast.success(`Permanently deleted ${succeeded} item(s)`);
    if (failed) toast.error(`Failed to delete ${failed} item(s)`);
  };

  const selectedCount = visible.filter((item) => selected.has(keyOf(item))).length;

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Trash</h1>
        <p className="mt-1 text-sm text-slate-500">
          Deleted users, orders, messages, packages and payment numbers. Restore them or permanently delete.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                filter === key ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {visible.length > 0 && (
          <Button type="button" variant="ghost-dark" onClick={handleDeleteAll} disabled={bulkBusy} className="!border-red-200 !text-red-600 hover:!border-red-300">
            <Trash2 size={14} /> সব ডিলিট করুন ({visible.length})
          </Button>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-sm font-semibold text-blue-800">{selectedCount}টি আইটেম নির্বাচিত</p>
          <div className="flex gap-2">
            <Button type="button" variant="small" onClick={handleBulkRestore} disabled={bulkBusy}>
              <RotateCcw size={14} /> রিস্টোর করুন
            </Button>
            <Button type="button" variant="ghost-dark" onClick={handleBulkDelete} disabled={bulkBusy} className="!border-red-200 !text-red-600 hover:!border-red-300">
              <Trash2 size={14} /> ডিলিট করুন
            </Button>
          </div>
        </div>
      )}

      <AdminCard>
        {loading ? (
          <table className="w-full min-w-[640px] text-left text-sm">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={4} />
              ))}
            </tbody>
          </table>
        ) : visible.length === 0 ? (
          <EmptyState text="Trash is empty." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-3">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} aria-label="Select all" />
                  </th>
                  <th className="pb-2 pr-3">Type</th>
                  <th className="pb-2 pr-3">Item</th>
                  <th className="pb-2 pr-3">Deleted</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={keyOf(item)} className="border-b border-slate-50 align-top last:border-0">
                    <td className="py-3 pr-3">
                      <input type="checkbox" checked={selected.has(keyOf(item))} onChange={() => toggleSelect(item)} aria-label="Select item" />
                    </td>
                    <td className="py-3 pr-3">
                      <TypeBadge type={item.type} />
                    </td>
                    <td className="py-3 pr-3">
                      <p className="font-medium text-slate-800">{item.title}</p>
                      {item.subtitle && <p className="text-slate-500">{item.subtitle}</p>}
                    </td>
                    <td className="py-3 pr-3 text-slate-500">{new Date(item.deletedAt).toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRestore(item)}
                          disabled={busyId === item.id}
                          className="rounded-lg bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50"
                          aria-label="Restore"
                        >
                          <RotateCcw size={15} />
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item)}
                          disabled={busyId === item.id}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
                          aria-label="Delete permanently"
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
