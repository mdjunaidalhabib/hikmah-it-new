import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useUserAuth } from "../context/UserAuthContext";
import { inputClass, labelClass } from "../admin/components/ui";

export default function LoginPage() {
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
      toast.success("লগইন সফল হয়েছে");
      navigate(location.state?.from?.pathname || "/profile", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#edf4ff] px-4 py-12">
      <Seo title="লগইন" description="আপনার Hikmah IT অ্যাকাউন্টে লগইন করুন।" />
      <div className="w-full max-w-sm rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl">
        <h1 className="text-center text-xl font-bold text-slate-900">লগইন করুন</h1>
        <p className="mt-1 text-center text-sm text-slate-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            মোবাইল নাম্বার অথবা ইমেইল
            <input
              className={inputClass}
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="01XXXXXXXXX অথবা email@example.com"
              required
              autoFocus
            />
          </label>

          <label className={labelClass}>
            পাসওয়ার্ড
            <PasswordInput name="password" value={form.password} onChange={handleChange} required />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn size={16} />
            {loading ? "লগইন হচ্ছে…" : "লগইন করুন"}
          </Button>
        </form>

        <Link to="/forgot-password" className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700">
          পাসওয়ার্ড ভুলে গেছেন?
        </Link>
        <p className="mt-2 text-center text-sm text-slate-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
