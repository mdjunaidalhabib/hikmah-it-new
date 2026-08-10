import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useUserAuth } from "../context/UserAuthContext";
import { inputClass, labelClass } from "../admin/components/ui";

const emptyForm = { name: "", mobile: "", email: "", password: "", confirmPassword: "" };

export default function SignupPage() {
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
      setError("সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)");
      return;
    }
    if (form.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন ভেরিফাই করুন।");
      navigate("/verify", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#edf4ff] px-4 py-12">
      <Seo title="সাইন আপ" description="Hikmah IT-তে নতুন অ্যাকাউন্ট তৈরি করুন।" />
      <div className="w-full max-w-sm rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
        <h1 className="text-center text-xl font-bold text-slate-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-center text-sm text-slate-500">অর্ডার ও রেফারেল ইনকাম ট্র্যাক করতে সাইন আপ করুন</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            নাম
            <input className={inputClass} name="name" value={form.name} onChange={handleChange} required autoFocus />
          </label>

          <label className={labelClass}>
            মোবাইল নাম্বার
            <input className={inputClass} name="mobile" value={form.mobile} onChange={handleChange} placeholder="01XXXXXXXXX" required />
          </label>

          <label className={labelClass}>
            ইমেইল
            <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className={labelClass}>
            পাসওয়ার্ড
            <PasswordInput name="password" value={form.password} onChange={handleChange} required />
            <PasswordStrengthMeter password={form.password} />
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
            <UserPlus size={16} />
            {loading ? "তৈরি হচ্ছে…" : "সাইন আপ করুন"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
