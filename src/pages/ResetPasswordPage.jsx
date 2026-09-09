import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { apiPost } from "../lib/api";
import { inputClass, labelClass } from "../components/formStyles";
import { useLanguage } from "../i18n/LanguageContext";

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError(t("resetPasswordPage.errors.passwordMismatch"));
      return;
    }
    if (form.newPassword.length < 8) {
      setError(t("resetPasswordPage.errors.passwordTooShort"));
      return;
    }

    setLoading(true);
    try {
      await apiPost("/user/reset-password", {
        email: form.email,
        otp: form.otp.trim(),
        newPassword: form.newPassword,
      });
      toast.success(t("resetPasswordPage.successToast"));
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12 dark:bg-slate-900">
      <Seo title={t("resetPasswordPage.seo.title")} description={t("resetPasswordPage.seo.description")} />
      <div className="w-full max-w-sm rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl dark:border-brand-800/40 dark:bg-slate-800">
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">{t("resetPasswordPage.heading")}</h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">{t("resetPasswordPage.subheading")}</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            {t("resetPasswordPage.emailLabel")}
            <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} required autoFocus />
          </label>

          <label className={labelClass}>
            {t("resetPasswordPage.otpLabel")}
            <input
              className={inputClass}
              name="otp"
              value={form.otp}
              onChange={(e) => setForm((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
              inputMode="numeric"
              placeholder={t("resetPasswordPage.otpPlaceholder")}
              required
            />
          </label>

          <label className={labelClass}>
            {t("resetPasswordPage.newPasswordLabel")}
            <PasswordInput name="newPassword" value={form.newPassword} onChange={handleChange} required />
            <PasswordStrengthMeter password={form.newPassword} />
          </label>

          <label className={labelClass}>
            {t("resetPasswordPage.confirmPasswordLabel")}
            <PasswordInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <KeyRound size={16} />
            {loading ? t("resetPasswordPage.submitting") : t("resetPasswordPage.submit")}
          </Button>
        </form>

        <Link to="/login" className="mt-4 block text-center text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
          {t("resetPasswordPage.backToLogin")}
        </Link>
      </div>
    </div>
  );
}
