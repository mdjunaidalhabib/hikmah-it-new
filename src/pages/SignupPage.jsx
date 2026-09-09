import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useUserAuth } from "../context/UserAuthContext";
import { inputClass, labelClass } from "../components/formStyles";
import { useLanguage } from "../i18n/LanguageContext";

const emptyForm = { name: "", mobile: "", email: "", password: "", confirmPassword: "" };

export default function SignupPage() {
  const { t } = useLanguage();
  const { signup } = useUserAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^01[3-9]\d{8}$/.test(form.mobile.trim())) {
      setError(t("signupPage.errors.invalidMobile"));
      return;
    }
    if (form.password.length < 8) {
      setError(t("signupPage.errors.passwordTooShort"));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t("signupPage.errors.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      toast.success(t("signupPage.successToast"));
      navigate("/verify", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12 dark:bg-slate-900">
      <Seo title={t("signupPage.seo.title")} description={t("signupPage.seo.description")} />
      <div className="w-full max-w-sm rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl dark:border-brand-800/40 dark:bg-slate-800">
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">{t("signupPage.heading")}</h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">{t("signupPage.subheading")}</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            {t("signupPage.nameLabel")}
            <input className={inputClass} name="name" value={form.name} onChange={handleChange} required autoFocus />
          </label>

          <label className={labelClass}>
            {t("signupPage.mobileLabel")}
            <input className={inputClass} name="mobile" value={form.mobile} onChange={handleChange} placeholder={t("signupPage.mobilePlaceholder")} required />
          </label>

          <label className={labelClass}>
            {t("signupPage.emailLabel")}
            <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className={labelClass}>
            {t("signupPage.passwordLabel")}
            <PasswordInput name="password" value={form.password} onChange={handleChange} required />
            <PasswordStrengthMeter password={form.password} />
          </label>

          <label className={labelClass}>
            {t("signupPage.confirmPasswordLabel")}
            <PasswordInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <UserPlus size={16} />
            {loading ? t("signupPage.submitting") : t("signupPage.submit")}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("signupPage.haveAccount")}{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            {t("signupPage.loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
