import { useEffect, useState } from "react";
import { Mail, MessageSquareText, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiDelete } from "../../lib/api";
import { AdminCard, EmptyState } from "../components/ui";
import { Skeleton, SkeletonRow } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";

const statusStyles = {
  sent: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failed: "border-red-200 bg-red-50 text-red-700",
  skipped_not_configured: "border-slate-200 bg-slate-100 text-slate-500",
};
const statusLabels = { sent: "Sent", failed: "Failed", skipped_not_configured: "Skipped" };

function DeliveryStatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status] || statusStyles.skipped_not_configured}`}>
      {statusLabels[status] || status}
    </span>
  );
}

function StatTile({ icon: Icon, label, value, tone }) {
  const tones = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
    red: "border-red-100 bg-red-50 text-red-700",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <Icon size={14} /> {label}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

const filterTabs = [
  { key: "", label: "All" },
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
];

const emptySummary = { email: { sent: 0, failed: 0, skipped_not_configured: 0 }, sms: { sent: 0, failed: 0, skipped_not_configured: 0 } };

export default function NotificationsDashboard() {
  const confirm = useConfirm();
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [channel, setChannel] = useState("");
  const [clearing, setClearing] = useState(false);

  const load = async (pageNum, { append } = {}) => {
    const data = await apiGet(`/admin/notifications?page=${pageNum}${channel ? `&channel=${channel}` : ""}`);
    setSummary(data.summary);
    setTotal(data.total);
    setPage(data.page);
    setLogs((prev) => (append ? [...prev, ...data.logs] : data.logs));
  };

  useEffect(() => {
    setLoading(true);
    load(1).finally(() => setLoading(false));
  }, [channel]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await load(page + 1, { append: true });
    } finally {
      setLoadingMore(false);
    }
  };

  const handleClearAll = async () => {
    const ok = await confirm({ title: "সব Mail & SMS হিস্টোরি মুছবেন?", message: "এটা স্থায়ীভাবে মুছে যাবে, ট্র্যাশে যাবে না — ফিরিয়ে আনা যাবে না।", confirmLabel: "মুছে ফেলুন" });
    if (!ok) return;
    setClearing(true);
    try {
      await apiDelete("/admin/notifications");
      setLogs([]);
      setTotal(0);
      setSummary(emptySummary);
      setPage(1);
      toast.success("History cleared");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mail &amp; SMS</h1>
        <p className="mt-1 text-sm text-slate-500">Delivery activity for verification codes, password resets and order notifications.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatTile icon={Mail} label="Email sent" value={summary.email.sent} tone="emerald" />
          <StatTile icon={Mail} label="Email failed" value={summary.email.failed} tone="red" />
          <StatTile icon={Mail} label="Email skipped" value={summary.email.skipped_not_configured} tone="slate" />
          <StatTile icon={MessageSquareText} label="SMS sent" value={summary.sms.sent} tone="emerald" />
          <StatTile icon={MessageSquareText} label="SMS failed" value={summary.sms.failed} tone="red" />
          <StatTile icon={MessageSquareText} label="SMS skipped" value={summary.sms.skipped_not_configured} tone="slate" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filterTabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setChannel(key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              channel === key ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AdminCard
        title="Recent activity"
        action={
          logs.length > 0 && (
            <Button type="button" variant="small" onClick={handleClearAll} disabled={clearing} className="!border-red-600 !from-red-600 !to-red-700 hover:!shadow-red-600/30">
              <Trash2 size={14} /> {clearing ? "Clearing…" : "Clear All"}
            </Button>
          )
        }
      >
        {loading ? (
          <table className="w-full min-w-[600px] text-left text-sm">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))}
            </tbody>
          </table>
        ) : logs.length === 0 ? (
          <EmptyState text="No notifications sent yet." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2 pr-3">Channel</th>
                    <th className="pb-2 pr-3">To</th>
                    <th className="pb-2 pr-3">Purpose</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2 pr-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id} className="border-b border-slate-50 last:border-0">
                      <td className="py-3 pr-3 capitalize text-slate-700">{log.channel}</td>
                      <td className="py-3 pr-3 text-slate-700">{log.to}</td>
                      <td className="py-3 pr-3 text-slate-500">{log.purpose}</td>
                      <td className="py-3 pr-3">
                        <DeliveryStatusBadge status={log.status} />
                      </td>
                      <td className="py-3 pr-3 text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {logs.length < total && (
              <div className="mt-4 flex justify-center">
                <Button type="button" variant="ghost-dark" onClick={handleLoadMore} disabled={loadingMore}>
                  {loadingMore ? "Loading…" : `Add More (${total - logs.length} left)`}
                </Button>
              </div>
            )}
          </>
        )}
      </AdminCard>
    </div>
  );
}
