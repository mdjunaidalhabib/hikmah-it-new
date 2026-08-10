import { useEffect, useState } from "react";
import { Pencil, Search, ShieldCheck, ShieldAlert, Ban, UserCheck, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiPatch, apiDelete } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { SkeletonRow } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";

function VerifiedBadge({ verified, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
        verified ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      {verified ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
      {label}
    </span>
  );
}

function StatusBadge({ suspended }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${
        suspended ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {suspended ? "Suspended" : "Active"}
    </span>
  );
}

export default function UsersManager() {
  const confirm = useConfirm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async (q) => {
    setLoading(true);
    const data = await apiGet(`/admin/users${q ? `?q=${encodeURIComponent(q)}` : ""}`);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    load("");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    load(search);
  };

  const openEdit = (user) => {
    setForm({ email: user.email, password: "" });
    setError("");
    setEditing(user);
  };

  const handleToggleSuspend = async (user) => {
    const nextSuspended = !user.suspended;
    const ok = await confirm(
      nextSuspended
        ? { title: "ইউজার সাসপেন্ড করবেন?", message: `"${user.name}" আর লগইন বা অর্ডার করতে পারবে না।`, confirmLabel: "সাসপেন্ড করুন" }
        : { title: "ইউজার আবার সক্রিয় করবেন?", message: `"${user.name}"`, confirmLabel: "সক্রিয় করুন", danger: false }
    );
    if (!ok) return;
    try {
      await apiPatch(`/admin/users/${user._id}/suspend`, { suspended: nextSuspended });
      await load(search);
      toast.success(nextSuspended ? "User suspended" : "User reactivated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (user) => {
    const ok = await confirm({ title: "ইউজার ট্র্যাশে সরাবেন?", message: `"${user.name}" — পরে চাইলে Trash পেজ থেকে রিস্টোর করা যাবে।`, confirmLabel: "ট্র্যাশে সরান" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/users/${user._id}`);
      await load(search);
      toast.success("User moved to trash");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { email: form.email.trim() };
      if (form.password) payload.password = form.password;
      await apiPatch(`/admin/users/${editing._id}/credentials`, payload);
      setEditing(null);
      await load(search);
      toast.success("User updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-500">Customer accounts, verification status and login credentials.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          className={`${inputClass} !mt-0 max-w-xs`}
          placeholder="Search name, email, mobile or referral code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="small">
          <Search size={14} /> Search
        </Button>
      </form>

      <AdminCard>
        {loading ? (
          <table className="w-full min-w-[760px] text-left text-sm">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))}
            </tbody>
          </table>
        ) : users.length === 0 ? (
          <EmptyState text="No users yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-3">Name</th>
                  <th className="pb-2 pr-3">Contact</th>
                  <th className="pb-2 pr-3">Verification</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2 pr-3">Referral Code</th>
                  <th className="pb-2 pr-3">Joined</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-slate-50 align-top last:border-0">
                    <td className="py-3 pr-3 font-medium text-slate-800">{u.name}</td>
                    <td className="py-3 pr-3">
                      <p className="text-slate-700">{u.mobile}</p>
                      <p className="text-slate-500">{u.email}</p>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="grid gap-1">
                        <VerifiedBadge verified={u.mobileVerified} label="Mobile" />
                        <VerifiedBadge verified={u.emailVerified} label="Email" />
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <StatusBadge suspended={u.suspended} />
                    </td>
                    <td className="py-3 pr-3 font-mono text-slate-600">{u.referralCode}</td>
                    <td className="py-3 pr-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openEdit(u)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(u)}
                          className={`rounded-lg p-1.5 text-slate-500 ${u.suspended ? "hover:bg-emerald-50 hover:text-emerald-600" : "hover:bg-red-50 hover:text-red-600"}`}
                          aria-label={u.suspended ? "Reactivate" : "Suspend"}
                        >
                          {u.suspended ? <UserCheck size={14} /> : <Ban size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
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

      {editing && (
        <Modal title={`Edit ${editing.name}`} onClose={() => setEditing(null)}>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              Mobile (cannot be changed)
              <input className={inputClass} value={editing.mobile} disabled />
            </label>
            <label className={labelClass}>
              Email
              <input className={inputClass} type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            </label>
            <label className={labelClass}>
              New Password (leave blank to keep current)
              <input
                className={inputClass}
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                minLength={8}
              />
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
