import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { useUserAuth } from "../context/UserAuthContext";
import { apiPost } from "../lib/api";
import { inputClass } from "../components/formStyles";
import { useLanguage } from "../i18n/LanguageContext";

const RESEND_COOLDOWN = 60;

function VerifyBlock({ icon: Icon, label, contact, verified, verifyPath, resendPath, onVerified }) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (verified) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800/40 dark:bg-emerald-500/10">
        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
        <div>
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">{label} {t("verifyPendingPage.verified")}</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">{contact}</p>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      toast.error(t("verifyPendingPage.otpLengthError"));
      return;
    }
    setSubmitting(true);
    try {
      await apiPost(verifyPath, { otp: otp.trim() });
      toast.success(t("verifyPendingPage.verifiedToast").replace("{label}", label));
      onVerified();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      const data = await apiPost(resendPath, {});
      toast.success(data.message);
      setSent(true);
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  if (!sent) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/40 dark:bg-amber-500/10">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <Icon size={18} />
          <p className="text-sm font-semibold">{t("verifyPendingPage.verifyThis").replace("{label}", label)}</p>
        </div>
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{t("verifyPendingPage.sendCodePrompt").replace("{contact}", contact)}</p>

        <Button type="button" variant="small" onClick={handleSend} disabled={sending} className="mt-3">
          {sending ? t("verifyPendingPage.sending") : t("verifyPendingPage.sendCode")}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/40 dark:bg-amber-500/10">
      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
        <Icon size={18} />
        <p className="text-sm font-semibold">{t("verifyPendingPage.verifyThis").replace("{label}", label)}</p>
      </div>
      <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{t("verifyPendingPage.enterCodePrompt").replace("{contact}", contact)}</p>

      <form onSubmit={handleVerify} className="mt-3 flex flex-wrap gap-2">
        <input
          className={`${inputClass} !mt-0 max-w-[160px]`}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder={t("verifyPendingPage.otpPlaceholder")}
          inputMode="numeric"
        />
        <Button type="submit" variant="small" disabled={submitting}>
          {submitting ? t("verifyPendingPage.verifying") : t("verifyPendingPage.verify")}
        </Button>
      </form>

      <button
        type="button"
        onClick={handleSend}
        disabled={sending || cooldown > 0}
        className="mt-2 text-xs font-medium text-amber-800 underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-amber-300"
      >
        {cooldown > 0
          ? t("verifyPendingPage.resendWithCooldown").replace("{seconds}", cooldown)
          : sending
          ? t("verifyPendingPage.sending")
          : t("verifyPendingPage.resend")}
      </button>
    </div>
  );
}

export default function VerifyPendingPage() {
  const { t } = useLanguage();
  const { user, refresh } = useUserAuth();

  if (!user) return null;

  const bothVerified = user.emailVerified && user.mobileVerified;

  return (
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12 dark:bg-slate-900">
      <Seo title={t("verifyPendingPage.seo.title")} description={t("verifyPendingPage.seo.description")} />
      <div className="w-full max-w-md rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl dark:border-brand-800/40 dark:bg-slate-800">
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">{t("verifyPendingPage.heading")}</h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
          {bothVerified ? t("verifyPendingPage.subheadingVerified") : t("verifyPendingPage.subheadingPending")}
        </p>

        <div className="mt-6 grid gap-4">
          <VerifyBlock
            icon={Mail}
            label={t("verifyPendingPage.emailLabel")}
            contact={user.email}
            verified={user.emailVerified}
            verifyPath="/user/verify-email"
            resendPath="/user/resend-email-otp"
            onVerified={refresh}
          />
          <VerifyBlock
            icon={Smartphone}
            label={t("verifyPendingPage.mobileLabel")}
            contact={user.mobile}
            verified={user.mobileVerified}
            verifyPath="/user/verify-mobile"
            resendPath="/user/resend-mobile-otp"
            onVerified={refresh}
          />
        </div>

        {bothVerified && (
          <Button href="/profile" className="mt-6 w-full">
            {t("verifyPendingPage.goToProfile")}
          </Button>
        )}
      </div>
    </div>
  );
}
