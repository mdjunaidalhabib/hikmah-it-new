import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Copy, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { Skeleton } from "../components/Skeleton";
import { apiGet, apiPost } from "../lib/api";
import useSiteSettings from "../lib/useSiteSettings";
import { useUserAuth } from "../context/UserAuthContext";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-3 focus:ring-blue-100";
const invalidInputClass =
  "mt-1 w-full rounded-xl border border-red-400 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-3 focus:ring-red-100";

const requiredFields = ["customerName", "customerPhone", "senderNumber", "transactionId"];

function formatPrice(pkg) {
  if (!pkg) return "";
  const base = pkg.priceLabel || `৳${pkg.priceAmount.toLocaleString("bn-BD")}`;
  return pkg.periodLabel ? `${base}${pkg.periodLabel}` : base;
}

export default function CheckoutPage() {
  const { packageId } = useParams();
  const { settings } = useSiteSettings();
  const { user } = useUserAuth();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    paymentMethod: "bKash",
    senderNumber: "",
    transactionId: "",
    referralCode: "",
  });
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    apiGet(`/public/packages/${packageId}`)
      .then(setPkg)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [packageId]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      customerName: prev.customerName || user.name,
      customerPhone: prev.customerPhone || user.mobile,
      customerEmail: prev.customerEmail || user.email,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim() && invalidFields.includes(name)) {
      setInvalidFields((prev) => prev.filter((f) => f !== name));
    }
  };

  const fieldClass = (name) => (invalidFields.includes(name) ? invalidInputClass : inputClass);

  const copyNumber = (number) => {
    navigator.clipboard?.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(""), 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const missing = requiredFields.filter((field) => !form[field].trim());
    if (missing.length > 0) {
      setInvalidFields(missing);
      setError("অনুগ্রহ করে লাল চিহ্নিত সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }
    setInvalidFields([]);

    setSubmitting(true);
    try {
      await apiPost("/public/purchases", {
        packageId: pkg._id,
        packageNameSnapshot: pkg.name,
        priceSnapshot: formatPrice(pkg),
        ...form,
      });
      setSubmitted(true);
      toast.success("অর্ডার সাবমিট হয়েছে!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf4ff] py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1000px,calc(100%-40px))] gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-lg">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="mt-3 h-7 w-2/3" />
              <Skeleton className="mt-2 h-8 w-1/3" />
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-4 h-14 w-full" />
              <Skeleton className="mt-2 h-14 w-full" />
            </div>
          </div>
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl lg:p-8">
            <Skeleton className="h-6 w-40" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="mt-4 h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-[#edf4ff] px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">প্যাকেজটি খুঁজে পাওয়া যায়নি</h1>
          <p className="mt-2 text-slate-600">এই প্যাকেজটি হয়তো সরিয়ে নেওয়া হয়েছে।</p>
          <Button href="/pricing" className="mt-6">সব প্যাকেজ দেখুন</Button>
        </div>
      </div>
    );
  }

  if (user && !(user.emailVerified && user.mobileVerified)) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-[#edf4ff] px-6 text-center">
        <div className="max-w-md rounded-[2rem] border border-amber-200 bg-white p-8 shadow-xl">
          <ShieldCheck className="mx-auto text-amber-500" size={48} />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">অ্যাকাউন্ট ভেরিফিকেশন প্রয়োজন</h1>
          <p className="mt-3 text-slate-600">
            অর্ডার করার আগে আপনার ইমেইল ও মোবাইল নাম্বার ভেরিফাই করতে হবে।
          </p>
          <Button href="/verify" className="mt-6">ভেরিফাই করুন</Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-[#edf4ff] px-6 text-center">
        <div className="max-w-md rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-xl">
          <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">অর্ডার সাবমিট হয়েছে!</h1>
          <p className="mt-3 text-slate-600">
            আপনার পেমেন্ট তথ্য যাচাই করে আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ Hikmah IT বেছে নেওয়ার জন্য।
          </p>
          <Button href="/" className="mt-6">হোমপেজে ফিরুন</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ff] py-12 lg:py-16">
      <Seo title="চেকআউট" description="আপনার প্যাকেজের জন্য পেমেন্ট সম্পন্ন করুন।" />
      <div className="mx-auto grid w-[min(1000px,calc(100%-40px))] gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Package summary + payment instructions */}
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-lg">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{pkg.category}</span>
            <h2 className="mt-3 text-2xl font-medium text-slate-900">{pkg.name}</h2>
            <p className="mt-1 text-3xl font-bold text-blue-600">{formatPrice(pkg)}</p>
            {pkg.text && <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.text}</p>}
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldCheck size={18} />
              <h3 className="font-bold">পেমেন্ট নির্দেশনা</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              নিচের যেকোনো নাম্বারে "Send Money" করুন, তারপর পাশের ফর্মে আপনার নাম্বার ও ট্রানজেকশন আইডি লিখে সাবমিট করুন। আমরা যাচাই করে আপনার সাথে যোগাযোগ করব।
            </p>
            <div className="mt-4 grid gap-2">
              {settings?.paymentNumbers?.entries
                ?.filter((entry) => entry.number && entry.methods?.length)
                .map((entry) => (
                  <button
                    type="button"
                    key={entry._id || entry.number}
                    onClick={() => copyNumber(entry.number)}
                    className="flex items-center justify-between rounded-xl border border-amber-200 bg-white px-4 py-3 text-left transition hover:border-amber-400"
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-500">{entry.methods.join(" / ")}</span>
                      <span className="block text-lg font-bold text-slate-900">{entry.number}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                      <Copy size={14} /> {copied === entry.number ? "কপি হয়েছে" : "কপি করুন"}
                    </span>
                  </button>
                ))}
              {!settings?.paymentNumbers?.entries?.some((entry) => entry.number && entry.methods?.length) && (
                <p className="text-sm text-amber-800">পেমেন্ট নাম্বার শীঘ্রই যোগ করা হবে। এখনই অর্ডার করতে WhatsApp-এ যোগাযোগ করুন।</p>
              )}
            </div>

            {settings?.bankAccounts
              ?.filter((account) => account.accountNumber)
              .map((account) => (
                <div key={account._id} className="mt-4 rounded-xl border border-amber-200 bg-white px-4 py-3">
                  <span className="block text-xs font-semibold text-slate-500">ব্যাংক অ্যাকাউন্ট</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-900">
                    {account.bankName && <>{account.bankName}<br /></>}
                    {account.accountName && <>নাম: {account.accountName}<br /></>}
                    একাউন্ট নাম্বার: <span className="font-bold">{account.accountNumber}</span>
                    {account.branch && <><br />শাখা: {account.branch}</>}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Form */}
        <form className="grid gap-4 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl lg:p-8" onSubmit={handleSubmit} noValidate>
          <h3 className="text-xl font-bold text-slate-900">আপনার তথ্য দিন</h3>

          <label className="text-sm font-medium text-slate-700">
            নাম <span className="text-red-500">*</span>
            <input className={fieldClass("customerName")} name="customerName" value={form.customerName} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            ফোন নাম্বার <span className="text-red-500">*</span>
            <input className={fieldClass("customerPhone")} type="tel" name="customerPhone" value={form.customerPhone} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            ইমেইল (ঐচ্ছিক)
            <input className={inputClass} type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            পেমেন্ট মাধ্যম
            <select className={inputClass} name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="bKash">বিকাশ</option>
              <option value="Nagad">নগদ</option>
              <option value="Rocket">রকেট</option>
              <option value="Bank">ব্যাংক</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            যে নাম্বার থেকে টাকা পাঠিয়েছেন <span className="text-red-500">*</span>
            <input className={fieldClass("senderNumber")} name="senderNumber" value={form.senderNumber} onChange={handleChange} required placeholder="01XXXXXXXXX" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            ট্রানজেকশন আইডি <span className="text-red-500">*</span>
            <input className={fieldClass("transactionId")} name="transactionId" value={form.transactionId} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            রেফারেল কোড (থাকলে)
            <input className={inputClass} name="referralCode" value={form.referralCode} onChange={handleChange} placeholder="ঐচ্ছিক" />
          </label>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "সাবমিট হচ্ছে…" : "অর্ডার কনফার্ম করুন"}
          </Button>

          <p className="text-center text-xs text-slate-400">
            কোনো সমস্যা হলে <Link to="/contact" className="text-blue-600 hover:underline">যোগাযোগ করুন</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
