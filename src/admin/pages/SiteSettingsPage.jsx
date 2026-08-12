import { useEffect, useRef, useState } from "react";
import { Upload, Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { apiGet, apiPut, apiUpload, apiDeleteUpload } from "../../lib/api";
import { AdminCard, EmptyState, Modal, inputClass, labelClass } from "../components/ui";
import { Skeleton } from "../../components/Skeleton";
import Button from "../../components/Button";
import { useConfirm } from "../context/ConfirmContext";

const MOBILE_METHODS = ["bKash", "Nagad", "Rocket"];

const emptyForm = {
  logoUrl: "",
  tagline: "",
  phone: "",
  whatsapp: "",
  email: "",
  location: "",
  facebook: "",
  footerAbout: "",
  paymentNumbers: { entries: [] },
  bankAccounts: [],
  orderNotifications: { enabled: false, recipientEmail: "" },
  referralCommissionPercent: 5,
  sectionVisibility: { services: true, packages: true, portfolio: true, team: true },
};

const SECTION_VISIBILITY_LABELS = [
  { key: "services", label: "সার্ভিস" },
  { key: "packages", label: "প্যাকেজ" },
  { key: "portfolio", label: "প্রজেক্ট" },
  { key: "team", label: "টিম" },
];

const emptyPaymentForm = { methods: [], number: "" };
const emptyBankForm = { bankName: "", accountName: "", accountNumber: "", branch: "" };

function ViewField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-800">{value || "—"}</p>
    </div>
  );
}

function EditIconButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
      <Pencil size={15} />
    </button>
  );
}

const sectionTitles = {
  contact: "Edit Contact & Footer",
  referral: "Edit Referral Program",
  notifications: "Edit Order Notifications",
};

export default function SiteSettingsPage() {
  const confirm = useConfirm();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [savingVisibility, setSavingVisibility] = useState(null);

  const [editingPayment, setEditingPayment] = useState(null);
  const [paymentForm, setPaymentForm] = useState(emptyPaymentForm);
  const [paymentError, setPaymentError] = useState("");
  const [savingPayment, setSavingPayment] = useState(false);

  const [editingBank, setEditingBank] = useState(null);
  const [bankForm, setBankForm] = useState(emptyBankForm);
  const [bankError, setBankError] = useState("");
  const [savingBank, setSavingBank] = useState(false);

  const [editingSection, setEditingSection] = useState(null); // null | "contact" | "bank" | "referral" | "notifications"
  const [sectionForm, setSectionForm] = useState({});
  const [sectionError, setSectionError] = useState("");
  const [savingSection, setSavingSection] = useState(false);

  const applySettings = (data) => {
    setForm({
      ...emptyForm,
      ...data,
      paymentNumbers: { entries: data.paymentNumbers?.entries || [] },
      bankAccounts: data.bankAccounts || [],
      orderNotifications: { ...emptyForm.orderNotifications, ...data.orderNotifications },
      sectionVisibility: { ...emptyForm.sectionVisibility, ...data.sectionVisibility },
    });
  };

  const loadSettings = async () => {
    const data = await apiGet("/admin/settings");
    applySettings(data);
  };

  useEffect(() => {
    (async () => {
      await loadSettings();
      setLoading(false);
    })();
  }, []);

  // ── Payment numbers (list with add/edit/delete) ──
  const openNewPayment = () => {
    setPaymentForm(emptyPaymentForm);
    setPaymentError("");
    setEditingPayment("new");
  };

  const openEditPayment = (entry) => {
    setPaymentForm({ methods: entry.methods, number: entry.number });
    setPaymentError("");
    setEditingPayment(entry);
  };

  const closePaymentModal = () => setEditingPayment(null);

  const togglePaymentMethod = (method) => {
    setPaymentForm((prev) => ({
      ...prev,
      methods: prev.methods.includes(method) ? prev.methods.filter((m) => m !== method) : [...prev.methods, method],
    }));
  };

  const savePaymentEntries = async (entries) => {
    const data = await apiPut("/admin/settings", { paymentNumbers: { entries } });
    applySettings(data);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!paymentForm.number.trim() || paymentForm.methods.length === 0) {
      setPaymentError("Pick at least one method and enter a number");
      return;
    }

    setSavingPayment(true);
    setPaymentError("");
    try {
      const isNew = editingPayment === "new";
      const entries = isNew
        ? [...form.paymentNumbers.entries, { methods: paymentForm.methods, number: paymentForm.number.trim() }]
        : form.paymentNumbers.entries.map((entry) =>
            entry._id === editingPayment._id ? { ...entry, methods: paymentForm.methods, number: paymentForm.number.trim() } : entry
          );
      await savePaymentEntries(entries);
      closePaymentModal();
      toast.success(isNew ? "Number added" : "Number updated");
    } catch (err) {
      setPaymentError(err.message);
      toast.error(err.message);
    } finally {
      setSavingPayment(false);
    }
  };

  const handleDeletePayment = async (entry) => {
    const ok = await confirm({ title: "পেমেন্ট নাম্বার ট্র্যাশে সরাবেন?", message: `"${entry.number}" — পরে চাইলে Trash পেজ থেকে রিস্টোর করা যাবে।`, confirmLabel: "ট্র্যাশে সরান" });
    if (!ok) return;
    try {
      const entries = form.paymentNumbers.entries.map((e) => (e._id === entry._id ? { ...e, deletedAt: new Date().toISOString() } : e));
      await savePaymentEntries(entries);
      toast.success("Number moved to trash");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ── Bank accounts (list with add/edit/delete) ──
  const openNewBank = () => {
    setBankForm(emptyBankForm);
    setBankError("");
    setEditingBank("new");
  };

  const openEditBank = (account, index) => {
    setBankForm({ bankName: account.bankName, accountName: account.accountName, accountNumber: account.accountNumber, branch: account.branch });
    setBankError("");
    setEditingBank({ ...account, index });
  };

  const closeBankModal = () => setEditingBank(null);

  const saveBankAccounts = async (bankAccounts) => {
    const data = await apiPut("/admin/settings", { bankAccounts });
    applySettings(data);
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    if (!bankForm.accountNumber.trim()) {
      setBankError("Enter an account number");
      return;
    }

    setSavingBank(true);
    setBankError("");
    try {
      const isNew = editingBank === "new";
      const trimmed = {
        bankName: bankForm.bankName.trim(),
        accountName: bankForm.accountName.trim(),
        accountNumber: bankForm.accountNumber.trim(),
        branch: bankForm.branch.trim(),
      };
      const accounts = isNew
        ? [...form.bankAccounts, trimmed]
        : form.bankAccounts.map((account, i) => (i === editingBank.index ? { ...account, ...trimmed } : account));
      await saveBankAccounts(accounts);
      closeBankModal();
      toast.success(isNew ? "Bank account added" : "Bank account updated");
    } catch (err) {
      setBankError(err.message);
      toast.error(err.message);
    } finally {
      setSavingBank(false);
    }
  };

  const handleDeleteBank = async (index, accountNumber) => {
    const ok = await confirm({ title: "ব্যাংক অ্যাকাউন্ট মুছবেন?", message: `"${accountNumber}"`, confirmLabel: "মুছে ফেলুন" });
    if (!ok) return;
    try {
      await saveBankAccounts(form.bankAccounts.filter((_, i) => i !== index));
      toast.success("Bank account removed");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ── Logo (saves immediately on upload) ──
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await apiUpload(file, "logo");
      const data = await apiPut("/admin/settings", { logoUrl: url });
      applySettings(data);
      toast.success("Logo updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogoRemove = async () => {
    if (!form.logoUrl) return;
    const ok = await confirm({ title: "লোগো ডিলিট করবেন?", message: "Cloudinary থেকেও লোগোটি স্থায়ীভাবে মুছে যাবে।", confirmLabel: "ডিলিট করুন" });
    if (!ok) return;
    setUploading(true);
    try {
      await apiDeleteUpload(form.logoUrl);
      const data = await apiPut("/admin/settings", { logoUrl: "" });
      applySettings(data);
      toast.success("Logo removed");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ── Section visibility (saves immediately per toggle) ──
  const handleVisibilityToggle = async (key, checked) => {
    setSavingVisibility(key);
    try {
      const next = { ...form.sectionVisibility, [key]: checked };
      const data = await apiPut("/admin/settings", { sectionVisibility: next });
      applySettings(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingVisibility(null);
    }
  };

  // ── Single-item sections (Contact & Footer, Bank Account, Referral, Order Notifications) ──
  const sectionInitializers = {
    contact: () => ({
      tagline: form.tagline,
      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email,
      location: form.location,
      facebook: form.facebook,
      footerAbout: form.footerAbout,
    }),
    referral: () => ({ referralCommissionPercent: form.referralCommissionPercent }),
    notifications: () => ({ ...form.orderNotifications }),
  };

  const openSection = (section) => {
    setSectionForm(sectionInitializers[section]());
    setSectionError("");
    setEditingSection(section);
  };

  const closeSection = () => setEditingSection(null);

  const handleSectionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    setSavingSection(true);
    setSectionError("");
    try {
      let payload;
      if (editingSection === "notifications") payload = { orderNotifications: sectionForm };
      else if (editingSection === "referral") payload = { referralCommissionPercent: Number(sectionForm.referralCommissionPercent) || 0 };
      else payload = sectionForm;

      const data = await apiPut("/admin/settings", payload);
      applySettings(data);
      closeSection();
      toast.success("Saved");
    } catch (err) {
      setSectionError(err.message);
      toast.error(err.message);
    } finally {
      setSavingSection(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-4 h-10 w-full" />
            <Skeleton className="mt-3 h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const visiblePaymentEntries = form.paymentNumbers.entries.filter((entry) => !entry.deletedAt);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Logo, contact info, footer text, payments and integrations.</p>
        </div>
      </div>

      <AdminCard title="Logo">
        <div className="flex items-center gap-4">
          {form.logoUrl ? (
            <>
              <div className="relative">
                <img src={form.logoUrl} alt="Logo" className="h-12 w-auto rounded-lg border border-slate-200 bg-slate-50 object-contain px-2" />
                <button
                  type="button"
                  onClick={handleLogoRemove}
                  disabled={uploading}
                  className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700 disabled:opacity-50"
                  aria-label="Remove logo"
                >
                  <X size={12} />
                </button>
              </div>
              {uploading && <span className="text-sm text-slate-400">Uploading…</span>}
            </>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50">
              <Upload size={14} /> {uploading ? "Uploading…" : "Upload Logo"}
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
        </div>
      </AdminCard>

      <AdminCard
        title="সেকশন ভিজিবিলিটি"
        description="অফ করলে সেই সেকশনের পেজ, Navbar লিংক এবং Footer লিংক পুরো সাইট থেকে হাইড হয়ে যাবে।"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTION_VISIBILITY_LABELS.map(({ key, label }) => {
            const enabled = form.sectionVisibility[key];
            return (
              <label
                key={key}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
              >
                <span className="flex items-center gap-2">
                  {enabled ? <Eye size={15} className="text-blue-600" /> : <EyeOff size={15} className="text-slate-400" />}
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={enabled}
                  disabled={savingVisibility === key}
                  onChange={(e) => handleVisibilityToggle(key, e.target.checked)}
                />
              </label>
            );
          })}
        </div>
      </AdminCard>

      <AdminCard title="Contact & Footer" action={<EditIconButton onClick={() => openSection("contact")} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <ViewField label="Tagline" value={form.tagline} />
          <ViewField label="Phone" value={form.phone} />
          <ViewField label="WhatsApp Link" value={form.whatsapp} />
          <ViewField label="Email" value={form.email} />
          <ViewField label="Location" value={form.location} />
          <ViewField label="Facebook Page" value={form.facebook} />
        </div>
        {form.footerAbout && <p className="mt-4 text-sm leading-6 text-slate-600">{form.footerAbout}</p>}
      </AdminCard>

      <AdminCard
        title="Mobile Banking Numbers"
        description="Tick every method that shares a number — e.g. tick bKash + Nagad on one entry if they use the same number, and add a separate entry for Rocket if it's different."
        action={
          <Button type="button" variant="small" onClick={openNewPayment}>
            <Plus size={15} /> Add Number
          </Button>
        }
      >
        {visiblePaymentEntries.length === 0 ? (
          <EmptyState text="No numbers added yet. Click 'Add Number' to create one." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePaymentEntries.map((entry) => (
              <div key={entry._id} className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{entry.methods.join(" / ") || "—"}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{entry.number}</p>
                <div className="mt-2 flex justify-end gap-2">
                  <button onClick={() => openEditPayment(entry)} type="button" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeletePayment(entry)} type="button" className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminCard
        title="Bank Accounts"
        description="Optional — shown at checkout alongside mobile banking. Add one entry per account."
        action={
          <Button type="button" variant="small" onClick={openNewBank}>
            <Plus size={15} /> Add Bank Account
          </Button>
        }
      >
        {form.bankAccounts.length === 0 ? (
          <EmptyState text="No bank accounts added yet. Click 'Add Bank Account' to create one." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {form.bankAccounts.map((account, index) => (
              <div key={account._id || index} className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{account.bankName || "—"}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{account.accountNumber}</p>
                {account.accountName && <p className="text-sm text-slate-600">{account.accountName}</p>}
                {account.branch && <p className="text-xs text-slate-400">{account.branch}</p>}
                <div className="mt-2 flex justify-end gap-2">
                  <button onClick={() => openEditBank(account, index)} type="button" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDeleteBank(index, account.accountNumber)} type="button" className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminCard
        title="Referral Program"
        description="Commission customers earn when someone checks out using their referral code."
        action={<EditIconButton onClick={() => openSection("referral")} />}
      >
        <ViewField label="Commission" value={`${form.referralCommissionPercent}%`} />
        <p className="mt-3 text-xs text-slate-400">
          Applied to the package price when an order is placed with a valid referral code, snapshotted onto that order.
        </p>
      </AdminCard>

      <AdminCard
        title="Order Notifications"
        description="Email an admin whenever a customer submits an order."
        action={<EditIconButton onClick={() => openSection("notifications")} />}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ViewField label="Status" value={form.orderNotifications.enabled ? "Enabled" : "Disabled"} />
          <ViewField label="Recipient Email" value={form.orderNotifications.recipientEmail} />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Emails are sent via Resend using the server's <code>RESEND_API_KEY</code>. Set that in <code>server/.env</code> — it can't be configured here for security.
        </p>
      </AdminCard>

      {editingPayment && (
        <Modal title={editingPayment === "new" ? "Add Number" : "Edit Number"} onClose={closePaymentModal}>
          <form className="grid gap-4" onSubmit={handlePaymentSubmit} noValidate>
            <div className={labelClass}>
              Methods
              <div className="mt-1.5 flex flex-wrap gap-3">
                {MOBILE_METHODS.map((method) => (
                  <label key={method} className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={paymentForm.methods.includes(method)} onChange={() => togglePaymentMethod(method)} />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            <label className={labelClass}>
              Number
              <input
                className={inputClass}
                placeholder="01XXXXXXXXX"
                value={paymentForm.number}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, number: e.target.value }))}
                required
              />
            </label>

            {paymentError && <p className="text-sm font-medium text-red-600">{paymentError}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closePaymentModal}>Cancel</Button>
              <Button type="submit" disabled={savingPayment}>{savingPayment ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {editingBank && (
        <Modal title={editingBank === "new" ? "Add Bank Account" : "Edit Bank Account"} onClose={closeBankModal}>
          <form className="grid gap-4" onSubmit={handleBankSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Bank Name
                <input className={inputClass} value={bankForm.bankName} onChange={(e) => setBankForm((prev) => ({ ...prev, bankName: e.target.value }))} />
              </label>
              <label className={labelClass}>
                Account Name
                <input className={inputClass} value={bankForm.accountName} onChange={(e) => setBankForm((prev) => ({ ...prev, accountName: e.target.value }))} />
              </label>
              <label className={labelClass}>
                Account Number
                <input className={inputClass} value={bankForm.accountNumber} onChange={(e) => setBankForm((prev) => ({ ...prev, accountNumber: e.target.value }))} required />
              </label>
              <label className={labelClass}>
                Branch
                <input className={inputClass} value={bankForm.branch} onChange={(e) => setBankForm((prev) => ({ ...prev, branch: e.target.value }))} />
              </label>
            </div>

            {bankError && <p className="text-sm font-medium text-red-600">{bankError}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closeBankModal}>Cancel</Button>
              <Button type="submit" disabled={savingBank}>{savingBank ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {editingSection && (
        <Modal title={sectionTitles[editingSection]} onClose={closeSection}>
          <form className="grid gap-4" onSubmit={handleSectionSubmit} noValidate>
            {editingSection === "contact" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Tagline
                    <input className={inputClass} name="tagline" value={sectionForm.tagline} onChange={handleSectionChange} />
                  </label>
                  <label className={labelClass}>
                    Phone
                    <input className={inputClass} name="phone" value={sectionForm.phone} onChange={handleSectionChange} />
                  </label>
                  <label className={labelClass}>
                    WhatsApp Link
                    <input className={inputClass} name="whatsapp" value={sectionForm.whatsapp} onChange={handleSectionChange} placeholder="https://wa.me/8801..." />
                  </label>
                  <label className={labelClass}>
                    Email
                    <input className={inputClass} name="email" value={sectionForm.email} onChange={handleSectionChange} />
                  </label>
                  <label className={labelClass}>
                    Location
                    <input className={inputClass} name="location" value={sectionForm.location} onChange={handleSectionChange} />
                  </label>
                  <label className={labelClass}>
                    Facebook Page
                    <input className={inputClass} name="facebook" value={sectionForm.facebook} onChange={handleSectionChange} />
                  </label>
                </div>
                <label className={labelClass}>
                  Footer About Text
                  <textarea className={inputClass} name="footerAbout" value={sectionForm.footerAbout} onChange={handleSectionChange} rows={3} />
                </label>
              </>
            )}

            {editingSection === "referral" && (
              <label className={`${labelClass} max-w-xs`}>
                Commission (%)
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  name="referralCommissionPercent"
                  value={sectionForm.referralCommissionPercent}
                  onChange={handleSectionChange}
                />
              </label>
            )}

            {editingSection === "notifications" && (
              <>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" name="enabled" checked={sectionForm.enabled} onChange={handleSectionChange} />
                  Send an email when a new order is submitted
                </label>
                <label className={labelClass}>
                  Recipient Email
                  <input className={inputClass} type="email" name="recipientEmail" value={sectionForm.recipientEmail} onChange={handleSectionChange} placeholder="admin@hikmahit.com" />
                </label>
              </>
            )}

            {sectionError && <p className="text-sm font-medium text-red-600">{sectionError}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost-dark" onClick={closeSection}>Cancel</Button>
              <Button type="submit" disabled={savingSection}>{savingSection ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
