import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Star } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPost, apiPut, apiUpload } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { Skeleton } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";
import { computeReorderChanges } from "../lib/reorder";

const emptyForm = { name: "", role: "", quote: "", photoUrl: "", category: "", rating: 5, position: 1 };

export default function TestimonialsManager() {
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
    const data = await apiGet("/admin/testimonials");
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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await apiUpload(file);
      setForm((prev) => ({ ...prev, photoUrl: url }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const base = {
        name: form.name.trim(),
        role: form.role.trim(),
        quote: form.quote.trim(),
        photoUrl: form.photoUrl.trim(),
        category: form.category.trim(),
        rating: Number(form.rating) || 5,
      };
      const isNew = editing === "new";
      if (isNew) {
        await apiPost("/admin/testimonials", { ...base, sortOrder: items.length });
      } else {
        const changes = computeReorderChanges(items, editing._id, Number(form.position));
        const mine = changes.find((c) => c.id === editing._id);
        await apiPut(`/admin/testimonials/${editing._id}`, { ...base, sortOrder: mine ? mine.sortOrder : editing.sortOrder });
        await Promise.all(
          changes.filter((c) => c.id !== editing._id).map((c) => apiPut(`/admin/testimonials/${c.id}`, { sortOrder: c.sortOrder }))
        );
      }
      closeModal();
      await load();
      toast.success(isNew ? "Testimonial added" : "Testimonial updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const ok = await confirm({ title: "টেস্টিমোনিয়াল ডিলিট করবেন?", message: `"${item.name}"-এর টেস্টিমোনিয়াল ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/testimonials/${item._id}`);
      await load();
      toast.success("Testimonial deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage real client reviews shown on the public site. Only add genuine quotes.
          </p>
        </div>
        <Button type="button" variant="small" onClick={openNew}>
          <Plus size={15} /> Add Testimonial
        </Button>
      </div>

      <AdminCard>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="mt-2 h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState text="No testimonials yet. Click 'Add Testimonial' to create one." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item._id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                      {item.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-2 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(item)} className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {editing && (
        <Modal title={editing === "new" ? "Add Testimonial" : "Edit Testimonial"} onClose={closeModal}>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex items-center gap-4">
              {form.photoUrl && (
                <img src={form.photoUrl} alt="" className="h-14 w-14 rounded-full border border-slate-200 object-cover" />
              )}
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600">
                  <Upload size={14} /> {uploading ? "Uploading…" : "Upload Photo"}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Name
                <input className={inputClass} name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label className={labelClass}>
                Role / Company
                <input className={inputClass} name="role" value={form.role} onChange={handleChange} placeholder="e.g. Owner, ABC Store" />
              </label>
            </div>

            <label className={labelClass}>
              Quote
              <textarea className={inputClass} name="quote" value={form.quote} onChange={handleChange} rows={3} required />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                Category (optional)
                <input className={inputClass} name="category" value={form.category} onChange={handleChange} placeholder="e.g. ই-কমার্স ওয়েবসাইট" />
              </label>
              <label className={labelClass}>
                Rating (1-5)
                <input className={inputClass} type="number" min="1" max="5" name="rating" value={form.rating} onChange={handleChange} />
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
