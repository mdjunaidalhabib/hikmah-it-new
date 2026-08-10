import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiDeleteUpload, apiGet, apiPost, apiPut, apiUpload } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { Skeleton } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";
import { computeReorderChanges } from "../lib/reorder";

const emptyForm = { title: "", category: "", imageUrl: "", url: "", text: "", position: 1 };

export default function PortfolioManager() {
  const confirm = useConfirm();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/portfolio");
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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await apiUpload(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageRemove = async () => {
    if (!form.imageUrl) return;
    const ok = await confirm({ title: "ছবি ডিলিট করবেন?", message: "Cloudinary থেকেও ছবিটি স্থায়ীভাবে মুছে যাবে।", confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    setUploading(true);
    try {
      await apiDeleteUpload(form.imageUrl);
      setForm((prev) => ({ ...prev, imageUrl: "" }));
      toast.success("Image deleted");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const base = {
        title: form.title.trim(),
        category: form.category.trim(),
        imageUrl: form.imageUrl.trim(),
        url: form.url.trim(),
        text: form.text.trim(),
      };
      const isNew = editing === "new";
      if (isNew) {
        await apiPost("/admin/portfolio", { ...base, sortOrder: items.length });
      } else {
        const changes = computeReorderChanges(items, editing._id, Number(form.position));
        const mine = changes.find((c) => c.id === editing._id);
        await apiPut(`/admin/portfolio/${editing._id}`, { ...base, sortOrder: mine ? mine.sortOrder : editing.sortOrder });
        await Promise.all(
          changes.filter((c) => c.id !== editing._id).map((c) => apiPut(`/admin/portfolio/${c.id}`, { sortOrder: c.sortOrder }))
        );
      }
      closeModal();
      await load();
      toast.success(isNew ? "Project added" : "Project updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const ok = await confirm({ title: "প্রজেক্ট ডিলিট করবেন?", message: `"${item.title}" ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/portfolio/${item._id}`);
      await load();
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await apiPut(`/admin/portfolio/${item._id}`, { active: !item.active });
      await load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio / Projects</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the projects shown on the public Portfolio page.</p>
        </div>
        <Button type="button" variant="small" onClick={openNew}>
          <Plus size={15} /> Add Project
        </Button>
      </div>

      <AdminCard>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <Skeleton className="h-32 w-full rounded-none" />
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState text="No projects yet. Click 'Add Project' to create one." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const active = item.active !== false;
              return (
                <div key={item._id} className={`overflow-hidden rounded-xl border border-slate-200 ${active ? "" : "opacity-50"}`}>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="h-32 w-full object-cover" />
                  )}
                  <div className="p-3">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
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
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {editing && (
        <Modal title={editing === "new" ? "Add Project" : "Edit Project"} onClose={closeModal}>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex items-center gap-4">
              {form.imageUrl && (
                <div className="relative">
                  <img src={form.imageUrl} alt="" className="h-16 w-24 rounded-lg border border-slate-200 object-cover" />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    disabled={uploading}
                    className="absolute -right-1 -top-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700 disabled:opacity-50"
                    aria-label="Remove image"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50">
                  <Upload size={14} /> {uploading ? "Please wait…" : "Upload Image"}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>

            <label className={labelClass}>
              Title
              <input className={inputClass} name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label className={labelClass}>
              Category
              <input className={inputClass} name="category" value={form.category} onChange={handleChange} placeholder="E-commerce + Admin Panel" />
            </label>
            <label className={labelClass}>
              Live URL
              <input className={inputClass} name="url" value={form.url} onChange={handleChange} placeholder="https://..." />
            </label>
            <label className={labelClass}>
              Description
              <textarea className={inputClass} name="text" value={form.text} onChange={handleChange} rows={2} />
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
