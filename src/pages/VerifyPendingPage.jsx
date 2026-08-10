import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { useUserAuth } from "../context/UserAuthContext";
import { apiPost } from "../lib/api";
import { inputClass } from "../admin/components/ui";

const RESEND_COOLDOWN = 60;

function VerifyBlock({ icon: Icon, label, contact, verified, verifyPath, resendPath, onVerified }) {
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
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <CheckCircle2 className="text-emerald-600" size={20} />
        <div>
          <p className="text-sm font-semibold text-emerald-800">{label} ভেরিফাইড</p>
          <p className="text-xs text-emerald-700">{contact}</p>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      toast.error("৬ ডিজিটের কোড দিন");
      return;
    }
    setSubmitting(true);
    try {
      await apiPost(verifyPath, { otp: otp.trim() });
      toast.success(`${label} ভেরিফাই হয়েছে`);
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
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2 text-amber-800">
          <Icon size={18} />
          <p className="text-sm font-semibold">{label} ভেরিফাই করুন</p>
        </div>
        <p className="mt-1 text-xs text-amber-700">{contact}-এ ভেরিফিকেশন কোড পাঠাতে নিচে চাপুন</p>

        <Button type="button" variant="small" onClick={handleSend} disabled={sending} className="mt-3">
          {sending ? "পাঠানো হচ্ছে…" : "ভেরিফিকেশন কোড পাঠান"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center gap-2 text-amber-800">
        <Icon size={18} />
        <p className="text-sm font-semibold">{label} ভেরিফাই করুন</p>
      </div>
      <p className="mt-1 text-xs text-amber-700">{contact}-এ পাঠানো ৬ ডিজিটের কোড দিন</p>

      <form onSubmit={handleVerify} className="mt-3 flex flex-wrap gap-2">
        <input
          className={`${inputClass} !mt-0 max-w-[160px]`}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="——— ———"
          inputMode="numeric"
        />
        <Button type="submit" variant="small" disabled={submitting}>
          {submitting ? "যাচাই হচ্ছে…" : "ভেরিফাই করুন"}
        </Button>
      </form>

      <button
        type="button"
        onClick={handleSend}
        disabled={sending || cooldown > 0}
        className="mt-2 text-xs font-medium text-amber-800 underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cooldown > 0 ? `আবার পাঠান (${cooldown}s)` : sending ? "পাঠানো হচ্ছে…" : "কোড আবার পাঠান"}
      </button>
    </div>
  );
}

export default function VerifyPendingPage() {
  const { user, refresh } = useUserAuth();

  if (!user) return null;

  const bothVerified = user.emailVerified && user.mobileVerified;

  return (
    <div className="grid min-h-screen place-items-center bg-[#edf4ff] px-4 py-12">
      <Seo title="অ্যাকাউন্ট ভেরিফিকেশন" description="আপনার ইমেইল ও মোবাইল নাম্বার ভেরিফাই করুন।" />
      <div className="w-full max-w-md rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
        <h1 className="text-center text-xl font-bold text-slate-900">অ্যাকাউন্ট ভেরিফিকেশন</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          {bothVerified ? "আপনার অ্যাকাউন্ট সম্পূর্ণভাবে ভেরিফাইড।" : "অর্ডার করতে হলে ইমেইল ও মোবাইল দুটোই ভেরিফাই করতে হবে।"}
        </p>

        <div className="mt-6 grid gap-4">
          <VerifyBlock
            icon={Mail}
            label="ইমেইল"
            contact={user.email}
            verified={user.emailVerified}
            verifyPath="/user/verify-email"
            resendPath="/user/resend-email-otp"
            onVerified={refresh}
          />
          <VerifyBlock
            icon={Smartphone}
            label="মোবাইল"
            contact={user.mobile}
            verified={user.mobileVerified}
            verifyPath="/user/verify-mobile"
            resendPath="/user/resend-mobile-otp"
            onVerified={refresh}
          />
        </div>

        {bothVerified && (
          <Button href="/profile" className="mt-6 w-full">
            প্রোফাইলে যান
          </Button>
        )}
      </div>
    </div>
  );
}
