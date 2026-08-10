import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { apiPost } from "../../lib/api";
import { inputClass, labelClass } from "../components/ui";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

export default function AdminResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await apiPost(`/admin/reset-password/${token}`, { password: form.password });
      toast.success("Password reset. Please sign in.");
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-slate-900">Reset Password</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Choose a new password for your admin account.</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            New Password
            <input
              className={inputClass}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
              autoFocus
            />
          </label>

          <label className={labelClass}>
            Confirm Password
            <input
              className={inputClass}
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              minLength={8}
              required
            />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <KeyRound size={16} />
            {loading ? "Saving…" : "Reset Password"}
          </Button>
        </form>

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
