import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useUserAuth } from "../context/UserAuthContext";
import { inputClass, labelClass } from "../components/formStyles";
import { useLanguage } from "../i18n/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.identifier, form.password);
      toast.success(t("loginPage.successToast"));
      navigate(location.state?.from?.pathname || "/profile", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12 dark:bg-slate-900">
      <Seo title={t("loginPage.seo.title")} description={t("loginPage.seo.description")} />
      <div className="w-full max-w-sm rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl dark:border-brand-800/40 dark:bg-slate-800">
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">{t("loginPage.heading")}</h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">{t("loginPage.subheading")}</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            {t("loginPage.identifierLabel")}
            <input
              className={inputClass}
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder={t("loginPage.identifierPlaceholder")}
              required
              autoFocus
            />
          </label>

          <label className={labelClass}>
            {t("loginPage.passwordLabel")}
            <PasswordInput name="password" value={form.password} onChange={handleChange} required />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn size={16} />
            {loading ? t("loginPage.submitting") : t("loginPage.submit")}
          </Button>
        </form>

        <Link to="/forgot-password" className="mt-4 block text-center text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
          {t("loginPage.forgotPassword")}
        </Link>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("loginPage.noAccount")}{" "}
          <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            {t("loginPage.signupLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
