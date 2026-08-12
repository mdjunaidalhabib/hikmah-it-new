import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPost, apiPut } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { Skeleton } from "../../components/Skeleton";
import Button from "../../components/Button";
import { SERVICE_ICONS, DEFAULT_SERVICE_ICON } from "../../lib/serviceIcons";
import { useConfirm } from "../context/ConfirmContext";
import { computeReorderChanges } from "../lib/reorder";

const emptyForm = { title: "", text: "", iconName: DEFAULT_SERVICE_ICON, href: "", position: 1 };

export default function ServicesManager() {
  const confirm = useConfirm();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/services");
    setItems(data);
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

  const openEdit = (item) => {
    const position = items.findIndex((i) => i._id === item._id) + 1;
    setForm({ ...emptyForm, ...item, position });
    setError("");
    setEditing(item);
  };

  const closeModal = () => setEditing(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const base = {
        title: form.title.trim(),
        text: form.text.trim(),
        iconName: form.iconName,
        href: form.href.trim(),
      };
      const isNew = editing === "new";
      if (isNew) {
        await apiPost("/admin/services", { ...base, sortOrder: items.length });
      } else {
        const changes = computeReorderChanges(items, editing._id, Number(form.position));
        const mine = changes.find((c) => c.id === editing._id);
        await apiPut(`/admin/services/${editing._id}`, { ...base, sortOrder: mine ? mine.sortOrder : editing.sortOrder });
        await Promise.all(
          changes.filter((c) => c.id !== editing._id).map((c) => apiPut(`/admin/services/${c.id}`, { sortOrder: c.sortOrder }))
        );
      }
      closeModal();
      await load();
      toast.success(isNew ? "Service added" : "Service updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const ok = await confirm({ title: "সার্ভিস ডিলিট করবেন?", message: `"${item.title}" ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/services/${item._id}`);
      await load();
      toast.success("Service deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await apiPut(`/admin/services/${item._id}`, { active: !item.active });
      await load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the service cards shown on the Home and Services pages.</p>
        </div>
        <Button type="button" variant="small" onClick={openNew}>
          <Plus size={15} /> Add Service
        </Button>
      </div>

      <AdminCard>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState text="No services yet. Click 'Add Service' to create one." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const Icon = SERVICE_ICONS[item.iconName] || SERVICE_ICONS[DEFAULT_SERVICE_ICON];
              const active = item.active !== false;
              return (
                <div key={item._id} className={`rounded-xl border border-slate-200 p-3 ${active ? "" : "opacity-50"}`}>
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={16} />
                    </span>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.href}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs font-semibold ${active ? "text-emerald-600" : "text-slate-400"}`}>
                      {active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleActive(item)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label={active ? "Deactivate" : "Activate"}>
                        {active ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(item)} className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {editing && (
        <Modal title={editing === "new" ? "Add Service" : "Edit Service"} onClose={closeModal}>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              Icon
              <div className="mt-1 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  {(() => {
                    const Icon = SERVICE_ICONS[form.iconName] || SERVICE_ICONS[DEFAULT_SERVICE_ICON];
                    return <Icon size={18} />;
                  })()}
                </span>
                <select className={inputClass} name="iconName" value={form.iconName} onChange={handleChange}>
                  {Object.keys(SERVICE_ICONS).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label className={labelClass}>
              Title
              <input className={inputClass} name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label className={labelClass}>
              Description
              <textarea className={inputClass} name="text" value={form.text} onChange={handleChange} rows={2} />
            </label>
            <label className={labelClass}>
              Link (href)
              <input className={inputClass} name="href" value={form.href} onChange={handleChange} placeholder="/ecommerce" />
            </label>
            {editing !== "new" && (
              <label className={labelClass}>
                অবস্থান (Position)
                <select className={inputClass} name="position" value={form.position} onChange={handleChange}>
                  {items.map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
            )}

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
