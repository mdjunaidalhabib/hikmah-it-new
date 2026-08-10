import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { apiPost } from "../lib/api";
import { inputClass, labelClass } from "../admin/components/ui";

export default function ResetPasswordPage() {
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
      setError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে");
      return;
    }

    setLoading(true);
    try {
      await apiPost("/user/reset-password", {
        email: form.email,
        otp: form.otp.trim(),
        newPassword: form.newPassword,
      });
      toast.success("পাসওয়ার্ড রিসেট হয়েছে। এখন লগইন করুন।");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#edf4ff] px-4 py-12">
      <Seo title="পাসওয়ার্ড রিসেট করুন" description="কোড দিয়ে নতুন পাসওয়ার্ড সেট করুন।" />
      <div className="w-full max-w-sm rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
        <h1 className="text-center text-xl font-bold text-slate-900">পাসওয়ার্ড রিসেট করুন</h1>
        <p className="mt-1 text-center text-sm text-slate-500">ইমেইলে পাওয়া কোড ও নতুন পাসওয়ার্ড দিন</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            ইমেইল
            <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} required autoFocus />
          </label>

          <label className={labelClass}>
            ভেরিফিকেশন কোড
            <input
              className={inputClass}
              name="otp"
              value={form.otp}
              onChange={(e) => setForm((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
              inputMode="numeric"
              placeholder="৬ ডিজিটের কোড"
              required
            />
          </label>

          <label className={labelClass}>
            নতুন পাসওয়ার্ড
            <PasswordInput name="newPassword" value={form.newPassword} onChange={handleChange} required />
            <PasswordStrengthMeter password={form.newPassword} />
          </label>

          <label className={labelClass}>
            পাসওয়ার্ড নিশ্চিত করুন
            <PasswordInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <KeyRound size={16} />
            {loading ? "সেভ হচ্ছে…" : "পাসওয়ার্ড রিসেট করুন"}
          </Button>
        </form>

        <Link to="/login" className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700">
          লগইনে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
