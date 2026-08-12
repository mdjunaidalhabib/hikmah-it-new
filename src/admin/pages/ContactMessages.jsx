import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPatch } from "../../lib/api";
import { AdminCard, EmptyState, StatusBadge } from "../components/ui";
import { Skeleton } from "../../components/Skeleton";
import { useConfirm } from "../context/ConfirmContext";

export default function ContactMessages() {
  const confirm = useConfirm();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/contact");
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (msg) => {
    if (msg.status === "read") return;
    await apiPatch(`/admin/contact/${msg._id}`, { status: "read" });
    setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, status: "read" } : m)));
  };

  const handleDelete = async (msg) => {
    const ok = await confirm({ title: "মেসেজ ডিলিট করবেন?", message: `"${msg.name}"-এর মেসেজ ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/contact/${msg._id}`);
      await load();
      toast.success("Message deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Messages submitted through the public contact form.</p>
      </div>

      <AdminCard>
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="mt-2 h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <EmptyState text="No messages yet." />
        ) : (
          <div className="grid gap-3">
            {messages.map((m) => (
              <div
                key={m._id}
                onClick={() => markRead(m)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  m.status === "new" ? "border-blue-200 bg-blue-50/40" : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-800">{m.name}</p>
                    <p className="text-sm text-slate-500">{m.phone}</p>
                    {m.service && <p className="mt-1 text-xs font-medium text-blue-600">{m.service}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={m.status} />
                    <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(m);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {m.message && <p className="mt-2 text-sm text-slate-600">{m.message}</p>}
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
