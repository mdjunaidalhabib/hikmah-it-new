import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPost, apiPut } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { SkeletonRow } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";
import { computeReorderChanges } from "../lib/reorder";

const emptyForm = {
  category: "",
  name: "",
  priceAmount: "",
  priceLabel: "",
  periodLabel: "",
  renewalText: "",
  limits: "",
  text: "",
  features: "",
  notIncluded: "",
  highlighted: false,
  position: 1,
};

function toFormState(pkg, position) {
  return {
    ...emptyForm,
    ...pkg,
    priceAmount: pkg.priceAmount ?? "",
    limits: (pkg.limits || []).join(", "),
    features: (pkg.features || []).join("\n"),
    notIncluded: (pkg.notIncluded || []).join("\n"),
    position,
  };
}

function toPayload(form) {
  return {
    category: form.category.trim(),
    name: form.name.trim(),
    priceAmount: Number(form.priceAmount) || 0,
    priceLabel: form.priceLabel.trim(),
    periodLabel: form.periodLabel.trim(),
    renewalText: form.renewalText.trim(),
    limits: form.limits.split(",").map((s) => s.trim()).filter(Boolean),
    text: form.text.trim(),
    features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
    notIncluded: form.notIncluded.split("\n").map((s) => s.trim()).filter(Boolean),
    highlighted: !!form.highlighted,
  };
}

export default function PackagesManager() {
  const confirm = useConfirm();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | package object
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/packages");
    setPackages(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setError("");
    setEditing("new");
  };

  const openEdit = (pkg) => {
    const categoryItems = packages.filter((p) => p.category === pkg.category);
    const position = categoryItems.findIndex((p) => p._id === pkg._id) + 1;
    setForm(toFormState(pkg, position));
    setError("");
    setEditing(pkg);
  };

  const closeModal = () => setEditing(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const base = toPayload(form);
      const isNew = editing === "new";
      if (isNew) {
        const categoryItems = packages.filter((p) => p.category === base.category);
        await apiPost("/admin/packages", { ...base, sortOrder: categoryItems.length });
      } else {
        const categoryItems = packages.filter((p) => p.category === editing.category);
        const changes = computeReorderChanges(categoryItems, editing._id, Number(form.position));
        const mine = changes.find((c) => c.id === editing._id);
        await apiPut(`/admin/packages/${editing._id}`, { ...base, sortOrder: mine ? mine.sortOrder : editing.sortOrder });
        await Promise.all(
          changes.filter((c) => c.id !== editing._id).map((c) => apiPut(`/admin/packages/${c.id}`, { sortOrder: c.sortOrder }))
        );
      }
      closeModal();
      await load();
      toast.success(isNew ? "Package added" : "Package updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (pkg) => {
    const ok = await confirm({ title: "প্যাকেজ ডিলিট করবেন?", message: `"${pkg.name}" ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/packages/${pkg._id}`);
      await load();
      toast.success("Package deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleActive = async (pkg) => {
    try {
      await apiPut(`/admin/packages/${pkg._id}`, { active: !pkg.active });
      await load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const grouped = packages.reduce((acc, pkg) => {
    acc[pkg.category] = acc[pkg.category] || [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {});

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the pricing packages shown on the public site.</p>
        </div>
        <Button type="button" variant="small" onClick={openNew}>
          <Plus size={15} /> Add Package
        </Button>
      </div>

      {loading ? (
        <AdminCard>
          <table className="w-full min-w-[640px] text-left text-sm">
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))}
            </tbody>
          </table>
        </AdminCard>
      ) : packages.length === 0 ? (
        <AdminCard>
          <EmptyState text="No packages yet. Click 'Add Package' to create one." />
        </AdminCard>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <AdminCard key={category} title={category}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2 pr-3">Name</th>
                    <th className="pb-2 pr-3">Price</th>
                    <th className="pb-2 pr-3">Highlighted</th>
                    <th className="pb-2 pr-3">Order</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((pkg) => {
                    const active = pkg.active !== false;
                    return (
                    <tr key={pkg._id} className={`border-b border-slate-50 last:border-0 ${active ? "" : "opacity-50"}`}>
                      <td className="py-3 pr-3 font-semibold text-slate-800">{pkg.name}</td>
                      <td className="py-3 pr-3 text-slate-600">
                        {pkg.priceLabel || `৳${pkg.priceAmount}`}
                        {pkg.periodLabel}
                      </td>
                      <td className="py-3 pr-3">{pkg.highlighted ? "Yes" : "—"}</td>
                      <td className="py-3 pr-3">{pkg.sortOrder}</td>
                      <td className="py-3 pr-3">
                        <span className={`text-xs font-semibold ${active ? "text-emerald-600" : "text-slate-400"}`}>
                          {active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleToggleActive(pkg)}
                          className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                          aria-label={active ? "Deactivate" : "Activate"}
                        >
                          {active ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                        <button
                          onClick={() => openEdit(pkg)}
                          className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AdminCard>
        ))
      )}

      {editing && (
        <Modal title={editing === "new" ? "Add Package" : "Edit Package"} onClose={closeModal} wide>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Category
                <input className={inputClass} name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Website Packages" />
              </label>
              <label className={labelClass}>
                Name
                <input className={inputClass} name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label className={labelClass}>
                Price Amount (৳)
                <input className={inputClass} type="number" min="0" name="priceAmount" value={form.priceAmount} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                Price Label Override (e.g. "Custom")
                <input className={inputClass} name="priceLabel" value={form.priceLabel} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                Period Label (e.g. "/year")
                <input className={inputClass} name="periodLabel" value={form.periodLabel} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                Renewal Text
                <input className={inputClass} name="renewalText" value={form.renewalText} onChange={handleChange} />
              </label>
            </div>

            <label className={labelClass}>
              Limits (comma separated)
              <input className={inputClass} name="limits" value={form.limits} onChange={handleChange} placeholder="Up to 50 Products, Up to 100 Orders/month" />
            </label>

            <label className={labelClass}>
              Description
              <textarea className={inputClass} name="text" value={form.text} onChange={handleChange} rows={2} />
            </label>

            <label className={labelClass}>
              Features — Included (one per line)
              <textarea className={inputClass} name="features" value={form.features} onChange={handleChange} rows={5} />
            </label>

            <label className={labelClass}>
              Features — Not Included (one per line)
              <textarea className={inputClass} name="notIncluded" value={form.notIncluded} onChange={handleChange} rows={3} placeholder="e.g. Custom Domain, Priority Support" />
            </label>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" name="highlighted" checked={form.highlighted} onChange={handleChange} />
                Highlighted / Recommended
              </label>
              {editing !== "new" && (
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  অবস্থান (Position)
                  <select
                    className="rounded-lg border border-slate-200 px-2 py-1"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                  >
                    {packages.filter((p) => p.category === editing.category).map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
