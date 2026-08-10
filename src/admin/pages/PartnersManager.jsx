import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { apiDelete, apiDeleteUpload, apiGet, apiPost, apiPut, apiUpload } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { SkeletonRow } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";
import { computeReorderChanges } from "../lib/reorder";

const emptyFounder = { name: "", role: "", location: "", bio: "", skills: [], photoUrl: "", facebook: "", whatsapp: "" };

function FounderViewField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-800">{value || "—"}</p>
    </div>
  );
}

const emptyForm = {
  name: "",
  role: "",
  referralCode: "",
  location: "",
  whatsapp: "",
  facebook: "",
  skills: "",
  photoUrl: "",
  earningText: "",
  position: 1,
};

function toFormState(partner, position) {
  return { ...emptyForm, ...partner, skills: (partner.skills || []).join(", "), position };
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    role: form.role.trim(),
    referralCode: form.referralCode.trim().toUpperCase(),
    location: form.location.trim(),
    whatsapp: form.whatsapp.trim(),
    facebook: form.facebook.trim(),
    skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    photoUrl: form.photoUrl.trim(),
    earningText: form.earningText.trim(),
  };
}

export default function PartnersManager() {
  const confirm = useConfirm();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [founder, setFounder] = useState(emptyFounder);
  const [editingFounder, setEditingFounder] = useState(false);
  const [founderForm, setFounderForm] = useState(emptyFounder);
  const [founderError, setFounderError] = useState("");
  const [savingFounder, setSavingFounder] = useState(false);
  const [uploadingFounderPhoto, setUploadingFounderPhoto] = useState(false);
  const founderPhotoInputRef = useRef(null);

  const load = async () => {
    setLoading(true);
    const data = await apiGet("/admin/partners");
    setPartners(data);
    setLoading(false);
  };

  const loadFounder = async () => {
    const settings = await apiGet("/admin/settings");
    setFounder({ ...emptyFounder, ...settings.founder });
  };

  useEffect(() => {
    load();
    loadFounder();
  }, []);

  const openFounderEdit = () => {
    setFounderForm({ ...emptyFounder, ...founder, skills: (founder.skills || []).join(", ") });
    setFounderError("");
    setEditingFounder(true);
  };

  const closeFounderModal = () => setEditingFounder(false);

  const handleFounderChange = (e) => {
    const { name, value } = e.target;
    setFounderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFounderPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFounderPhoto(true);
    try {
      const { url } = await apiUpload(file, "image");
      setFounderForm((prev) => ({ ...prev, photoUrl: url }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploadingFounderPhoto(false);
      if (founderPhotoInputRef.current) founderPhotoInputRef.current.value = "";
    }
  };

  const handleFounderPhotoRemove = async () => {
    if (!founderForm.photoUrl) return;
    const ok = await confirm({ title: "ছবি ডিলিট করবেন?", message: "Cloudinary থেকেও ছবিটি স্থায়ীভাবে মুছে যাবে।", confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    setUploadingFounderPhoto(true);
    try {
      await apiDeleteUpload(founderForm.photoUrl);
      setFounderForm((prev) => ({ ...prev, photoUrl: "" }));
      toast.success("Photo deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploadingFounderPhoto(false);
    }
  };

  const handleFounderSubmit = async (e) => {
    e.preventDefault();
    setSavingFounder(true);
    setFounderError("");
    try {
      const payload = {
        founder: {
          ...founderForm,
          skills: founderForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
        },
      };
      const data = await apiPut("/admin/settings", payload);
      setFounder({ ...emptyFounder, ...data.founder });
      closeFounderModal();
      toast.success("Team profile saved");
    } catch (err) {
      setFounderError(err.message);
      toast.error(err.message);
    } finally {
      setSavingFounder(false);
    }
  };

  const openNew = () => {
    setForm(emptyForm);
    setError("");
    setEditing("new");
  };

  const openEdit = (partner) => {
    const position = partners.findIndex((p) => p._id === partner._id) + 1;
    setForm(toFormState(partner, position));
    setError("");
    setEditing(partner);
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

  const handlePhotoRemove = async () => {
    if (!form.photoUrl) return;
    const ok = await confirm({ title: "ছবি ডিলিট করবেন?", message: "Cloudinary থেকেও ছবিটি স্থায়ীভাবে মুছে যাবে।", confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    setUploading(true);
    try {
      await apiDeleteUpload(form.photoUrl);
      setForm((prev) => ({ ...prev, photoUrl: "" }));
      toast.success("Photo deleted");
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
      const base = toPayload(form);
      const isNew = editing === "new";
      if (isNew) {
        await apiPost("/admin/partners", { ...base, sortOrder: partners.length });
      } else {
        const changes = computeReorderChanges(partners, editing._id, Number(form.position));
        const mine = changes.find((c) => c.id === editing._id);
        await apiPut(`/admin/partners/${editing._id}`, { ...base, sortOrder: mine ? mine.sortOrder : editing.sortOrder });
        await Promise.all(
          changes.filter((c) => c.id !== editing._id).map((c) => apiPut(`/admin/partners/${c.id}`, { sortOrder: c.sortOrder }))
        );
      }
      closeModal();
      await load();
      toast.success(isNew ? "Partner added" : "Partner updated");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (partner) => {
    const ok = await confirm({ title: "পার্টনার ডিলিট করবেন?", message: `"${partner.name}" ট্র্যাশে সরানো হবে — পরে চাইলে রিস্টোর করা যাবে।`, confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    try {
      await apiDelete(`/admin/partners/${partner._id}`);
      await load();
      toast.success("Partner deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleActive = async (partner) => {
    try {
      await apiPut(`/admin/partners/${partner._id}`, { active: !partner.active });
      await load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team & Referral Partners</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage team members and referral partners shown on the public Team page.
          </p>
        </div>
        <Button type="button" variant="small" onClick={openNew}>
          <Plus size={15} /> Add Partner
        </Button>
      </div>

      <AdminCard
        title="টিম প্রোফাইল"
        description="টিম পেজে দেখানো প্রতিষ্ঠাতা/মালিক প্রোফাইল।"
        action={
          <button type="button" onClick={openFounderEdit} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
            <Pencil size={15} />
          </button>
        }
      >
        <div className="flex items-center gap-4">
          {founder.photoUrl && (
            <img src={founder.photoUrl} alt={founder.name} className="h-16 w-16 rounded-full border border-slate-200 object-cover" />
          )}
          <div className="grid gap-1">
            <FounderViewField label="Name" value={founder.name} />
            <FounderViewField label="Role" value={founder.role} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FounderViewField label="Location" value={founder.location} />
          <FounderViewField label="Skills" value={(founder.skills || []).join(", ")} />
          <FounderViewField label="Facebook" value={founder.facebook} />
          <FounderViewField label="WhatsApp" value={founder.whatsapp} />
        </div>
        {founder.bio && <p className="mt-4 text-sm leading-6 text-slate-600">{founder.bio}</p>}
      </AdminCard>

      <AdminCard>
        {loading ? (
          <table className="w-full min-w-[720px] text-left text-sm">
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} cols={5} />
              ))}
            </tbody>
          </table>
        ) : partners.length === 0 ? (
          <EmptyState text="No partners yet. Click 'Add Partner' to create one." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-3">Name</th>
                  <th className="pb-2 pr-3">Role</th>
                  <th className="pb-2 pr-3">Referral Code</th>
                  <th className="pb-2 pr-3">Earning</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => {
                  const active = p.active !== false;
                  return (
                  <tr key={p._id} className={`border-b border-slate-50 last:border-0 ${active ? "" : "opacity-50"}`}>
                    <td className="py-3 pr-3 font-semibold text-slate-800">{p.name}</td>
                    <td className="py-3 pr-3 text-slate-600">{p.role}</td>
                    <td className="py-3 pr-3 text-slate-600">{p.referralCode}</td>
                    <td className="py-3 pr-3 text-slate-600">{p.earningText}</td>
                    <td className="py-3 pr-3">
                      <span className={`text-xs font-semibold ${active ? "text-emerald-600" : "text-slate-400"}`}>
                        {active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => handleToggleActive(p)} className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label={active ? "Deactivate" : "Activate"}>
                        {active ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button onClick={() => openEdit(p)} className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {editing && (
        <Modal title={editing === "new" ? "Add Partner" : "Edit Partner"} onClose={closeModal} wide>
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex items-center gap-4">
              {form.photoUrl && (
                <div className="relative">
                  <img src={form.photoUrl} alt="" className="h-16 w-16 rounded-full border border-slate-200 object-cover" />
                  <button
                    type="button"
                    onClick={handlePhotoRemove}
                    disabled={uploading}
                    className="absolute -right-1 -top-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700 disabled:opacity-50"
                    aria-label="Remove photo"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50">
                  <Upload size={14} /> {uploading ? "Please wait…" : "Upload Photo"}
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
                Role
                <input className={inputClass} name="role" value={form.role} onChange={handleChange} required placeholder="Referral Partner" />
              </label>
              <label className={labelClass}>
                Referral Code
                <input className={inputClass} name="referralCode" value={form.referralCode} onChange={handleChange} required placeholder="e.g. MAZ100" />
              </label>
              <label className={labelClass}>
                Location
                <input className={inputClass} name="location" value={form.location} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                WhatsApp Link
                <input className={inputClass} name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="https://wa.me/8801..." />
              </label>
              <label className={labelClass}>
                Facebook Link
                <input className={inputClass} name="facebook" value={form.facebook} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                Earning (display text)
                <input className={inputClass} name="earningText" value={form.earningText} onChange={handleChange} placeholder="৳20,000+" />
              </label>
              {editing !== "new" && (
                <label className={labelClass}>
                  অবস্থান (Position)
                  <select className={inputClass} name="position" value={form.position} onChange={handleChange}>
                    {partners.map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <label className={labelClass}>
              Skills (comma separated)
              <input className={inputClass} name="skills" value={form.skills} onChange={handleChange} placeholder="Digital Marketing, Lead Generation" />
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {editingFounder && (
        <Modal title="Edit Team Profile" onClose={closeFounderModal}>
          <form className="grid gap-4" onSubmit={handleFounderSubmit} noValidate>
            <div className="flex items-center gap-4">
              {founderForm.photoUrl && (
                <div className="relative">
                  <img src={founderForm.photoUrl} alt="" className="h-16 w-16 rounded-full border border-slate-200 object-cover" />
                  <button
                    type="button"
                    onClick={handleFounderPhotoRemove}
                    disabled={uploadingFounderPhoto}
                    className="absolute -right-1 -top-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700 disabled:opacity-50"
                    aria-label="Remove photo"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => founderPhotoInputRef.current?.click()}
                  disabled={uploadingFounderPhoto}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
                >
                  <Upload size={14} /> {uploadingFounderPhoto ? "Please wait…" : "Upload Photo"}
                </button>
                <input ref={founderPhotoInputRef} type="file" accept="image/*" className="hidden" onChange={handleFounderPhotoUpload} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Name
                <input className={inputClass} name="name" value={founderForm.name} onChange={handleFounderChange} />
              </label>
              <label className={labelClass}>
                Role
                <input className={inputClass} name="role" value={founderForm.role} onChange={handleFounderChange} />
              </label>
              <label className={labelClass}>
                Location
                <input className={inputClass} name="location" value={founderForm.location} onChange={handleFounderChange} />
              </label>
              <label className={labelClass}>
                Skills (comma separated)
                <input className={inputClass} name="skills" value={founderForm.skills} onChange={handleFounderChange} placeholder="React, Next.js, Node.js" />
              </label>
              <label className={labelClass}>
                Facebook
                <input className={inputClass} name="facebook" value={founderForm.facebook} onChange={handleFounderChange} />
              </label>
              <label className={labelClass}>
                WhatsApp Link
                <input className={inputClass} name="whatsapp" value={founderForm.whatsapp} onChange={handleFounderChange} placeholder="https://wa.me/8801..." />
              </label>
            </div>
            <label className={labelClass}>
              Bio
              <textarea className={inputClass} name="bio" value={founderForm.bio} onChange={handleFounderChange} rows={3} />
            </label>

            {founderError && <p className="text-sm font-medium text-red-600">{founderError}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closeFounderModal}>Cancel</Button>
              <Button type="submit" disabled={savingFounder}>{savingFounder ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
