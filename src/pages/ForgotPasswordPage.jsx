import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { apiPost } from "../lib/api";
import { inputClass, labelClass } from "../components/formStyles";
import { useLanguage } from "../i18n/LanguageContext";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const data = await apiPost("/user/forgot-password", { email });
      setMessage(data.message);
      setStatus("sent");
      toast.success(data.message);
    } catch (err) {
      setMessage(err.message);
      setStatus("error");
      toast.error(err.message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12 dark:bg-slate-900">
      <Seo title={t("forgotPasswordPage.seo.title")} description={t("forgotPasswordPage.seo.description")} />
      <div className="w-full max-w-sm rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl dark:border-brand-800/40 dark:bg-slate-800">
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">{t("forgotPasswordPage.heading")}</h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">{t("forgotPasswordPage.subheading")}</p>

        {status === "sent" ? (
          <div className="mt-6">
            <p className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{message}</p>
            <Button className="mt-4 w-full" onClick={() => navigate("/reset-password", { state: { email } })} type="button">
              {t("forgotPasswordPage.resetWithCode")}
            </Button>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              {t("forgotPasswordPage.emailLabel")}
              <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                {message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              <Mail size={16} />
              {status === "loading" ? t("forgotPasswordPage.submitting") : t("forgotPasswordPage.submit")}
            </Button>
          </form>
        )}

        <Link to="/login" className="mt-4 block text-center text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
          {t("forgotPasswordPage.backToLogin")}
        </Link>
      </div>
    </div>
  );
}
