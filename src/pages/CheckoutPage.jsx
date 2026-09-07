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
import { formatTaka, getDisplayPrice, getDiscountPercent } from "../lib/pricing";
import { useLanguage } from "../i18n/LanguageContext";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100";
const invalidInputClass =
  "mt-1 w-full rounded-xl border border-red-400 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-3 focus:ring-red-100";

const requiredFields = ["customerName", "customerPhone", "senderNumber", "transactionId"];

function formatPrice(pkg) {
  if (!pkg) return "";
  const base = getDisplayPrice(pkg);
  return pkg.periodLabel ? `${base}${pkg.periodLabel}` : base;
}

export default function CheckoutPage() {
  const { packageId } = useParams();
  const { settings } = useSiteSettings();
  const { user } = useUserAuth();
  const { t } = useLanguage();
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
      setError(t("checkoutPage.requiredError"));
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
      toast.success(t("checkoutPage.orderSubmittedToast"));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen animate-page-in bg-brand-50 py-12 lg:py-16">
        <div className="mx-auto grid w-[min(1000px,calc(100%-40px))] gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-lg">
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
          <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl lg:p-8">
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
      <div className="grid min-h-[60vh] animate-page-in place-items-center bg-brand-50 px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("checkoutPage.packageNotFoundHeading")}</h1>
          <p className="mt-2 text-slate-600">{t("checkoutPage.packageNotFoundText")}</p>
          <Button href="/pricing" className="mt-6">{t("checkoutPage.viewAllPackagesBtn")}</Button>
        </div>
      </div>
    );
  }

  if (user && !(user.emailVerified && user.mobileVerified)) {
    return (
      <div className="grid min-h-[60vh] animate-page-in place-items-center bg-brand-50 px-6 text-center">
        <div className="max-w-md rounded-[2rem] border border-amber-200 bg-white p-8 shadow-xl">
          <ShieldCheck className="mx-auto text-amber-500" size={48} />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">{t("checkoutPage.verificationNeededHeading")}</h1>
          <p className="mt-3 text-slate-600">
            {t("checkoutPage.verificationNeededText")}
          </p>
          <Button href="/verify" className="mt-6">{t("checkoutPage.verifyBtn")}</Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="grid min-h-[60vh] animate-page-in place-items-center bg-brand-50 px-6 text-center">
        <div className="max-w-md rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-xl">
          <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">{t("checkoutPage.orderSubmittedHeading")}</h1>
          <p className="mt-3 text-slate-600">
            {t("checkoutPage.orderSubmittedText")}
          </p>
          <Button href="/" className="mt-6">{t("checkoutPage.backHomeBtn")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-page-in bg-brand-50 py-12 lg:py-16">
      <Seo title={t("checkoutPage.seoTitle")} description={t("checkoutPage.seoDescription")} />
      <div className="mx-auto grid w-[min(1000px,calc(100%-40px))] gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Package summary + payment instructions */}
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-lg">
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{pkg.category}</span>
            <h2 className="mt-3 text-2xl font-medium text-slate-900">{pkg.name}</h2>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-brand-600">{getDisplayPrice(pkg)}</span>
              {pkg.periodLabel && <span className="text-sm font-medium text-slate-500">{pkg.periodLabel}</span>}
            </p>
            {getDiscountPercent(pkg) > 0 && (
              <p className="mt-1 text-sm text-slate-400">
                <span className="line-through">{formatTaka(pkg.originalPriceAmount)}</span>{" "}
                <span className="font-semibold text-emerald-600">{getDiscountPercent(pkg)}{t("pricingCard.discount")}</span>
              </p>
            )}
            {pkg.text && <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.text}</p>}
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldCheck size={18} />
              <h3 className="font-bold">{t("checkoutPage.paymentInstructionsHeading")}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              {t("checkoutPage.paymentInstructionsText")}
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
                      <Copy size={14} /> {copied === entry.number ? t("checkoutPage.copied") : t("checkoutPage.copyLabel")}
                    </span>
                  </button>
                ))}
              {!settings?.paymentNumbers?.entries?.some((entry) => entry.number && entry.methods?.length) && (
                <p className="text-sm text-amber-800">{t("checkoutPage.noPaymentNumbers")}</p>
              )}
            </div>

            {settings?.bankAccounts
              ?.filter((account) => account.accountNumber)
              .map((account) => (
                <div key={account._id} className="mt-4 rounded-xl border border-amber-200 bg-white px-4 py-3">
                  <span className="block text-xs font-semibold text-slate-500">{t("checkoutPage.bankAccountLabel")}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-900">
                    {account.bankName && <>{account.bankName}<br /></>}
                    {account.accountName && <>{t("checkoutPage.accountNameLabel")} {account.accountName}<br /></>}
                    {t("checkoutPage.accountNumberLabel")} <span className="font-bold">{account.accountNumber}</span>
                    {account.branch && <><br />{t("checkoutPage.branchLabel")} {account.branch}</>}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Form */}
        <form className="grid gap-4 rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl lg:p-8" onSubmit={handleSubmit} noValidate>
          <h3 className="text-xl font-bold text-slate-900">{t("checkoutPage.formHeading")}</h3>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.nameLabel")} <span className="text-red-500">*</span>
            <input className={fieldClass("customerName")} name="customerName" value={form.customerName} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.phoneLabel")} <span className="text-red-500">*</span>
            <input className={fieldClass("customerPhone")} type="tel" name="customerPhone" value={form.customerPhone} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.emailOptionalLabel")}
            <input className={inputClass} type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.paymentMethodLabel")}
            <select className={inputClass} name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="bKash">{t("checkoutPage.paymentMethods.bkash")}</option>
              <option value="Nagad">{t("checkoutPage.paymentMethods.nagad")}</option>
              <option value="Rocket">{t("checkoutPage.paymentMethods.rocket")}</option>
              <option value="Bank">{t("checkoutPage.paymentMethods.bank")}</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.senderNumberLabel")} <span className="text-red-500">*</span>
            <input className={fieldClass("senderNumber")} name="senderNumber" value={form.senderNumber} onChange={handleChange} required placeholder={t("checkoutPage.senderNumberPlaceholder")} />
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.transactionIdLabel")} <span className="text-red-500">*</span>
            <input className={fieldClass("transactionId")} name="transactionId" value={form.transactionId} onChange={handleChange} required />
          </label>

          <label className="text-sm font-medium text-slate-700">
            {t("checkoutPage.referralCodeLabel")}
            <input className={inputClass} name="referralCode" value={form.referralCode} onChange={handleChange} placeholder={t("checkoutPage.optionalPlaceholder")} />
          </label>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t("checkoutPage.submitting") : t("checkoutPage.confirmOrder")}
          </Button>

          <p className="text-center text-xs text-slate-400">
            {t("checkoutPage.helpTextPrefix")} <Link to="/contact" className="text-brand-600 hover:underline">{t("checkoutPage.contactLink")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
