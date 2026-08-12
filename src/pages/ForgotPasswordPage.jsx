import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { apiPost } from "../lib/api";
import { inputClass, labelClass } from "../components/formStyles";

export default function ForgotPasswordPage() {
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
    <div className="grid min-h-screen place-items-center bg-brand-50 px-4 py-12">
      <Seo title="পাসওয়ার্ড ভুলে গেছেন" description="আপনার Hikmah IT অ্যাকাউন্টের পাসওয়ার্ড রিসেট করুন।" />
      <div className="w-full max-w-sm rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl">
        <h1 className="text-center text-xl font-bold text-slate-900">পাসওয়ার্ড ভুলে গেছেন?</h1>
        <p className="mt-1 text-center text-sm text-slate-500">আপনার ইমেইলে একটি ভেরিফিকেশন কোড পাঠানো হবে।</p>

        {status === "sent" ? (
          <div className="mt-6">
            <p className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700">{message}</p>
            <Button className="mt-4 w-full" onClick={() => navigate("/reset-password", { state: { email } })} type="button">
              কোড দিয়ে পাসওয়ার্ড রিসেট করুন
            </Button>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              ইমেইল
              <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              <Mail size={16} />
              {status === "loading" ? "পাঠানো হচ্ছে…" : "কোড পাঠান"}
            </Button>
          </form>
        )}

        <Link to="/login" className="mt-4 block text-center text-sm font-medium text-brand-600 hover:text-brand-700">
          লগইনে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
