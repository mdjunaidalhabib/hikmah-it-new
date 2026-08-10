import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { apiPost } from "../../lib/api";
import { inputClass, labelClass } from "../components/ui";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const data = await apiPost("/admin/forgot-password", { email });
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
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-slate-900">Forgot Password</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Enter your registered admin email and we'll send a reset link.
        </p>

        {status === "sent" ? (
          <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700">
            {message}
          </p>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className={labelClass}>
              Email
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              <Mail size={16} />
              {status === "loading" ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
        )}

        <Link
          to="/admin/login"
          className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
