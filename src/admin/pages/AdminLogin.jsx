import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminAuth } from "../context/AdminAuthContext";
import { inputClass, labelClass } from "../components/ui";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await login(form.email, form.password);
      toast.success("Logged in");
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
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
        <h1 className="mt-6 text-center text-xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Sign in to manage your website</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className={labelClass}>
            Email
            <input
              className={inputClass}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>

          <label className={labelClass}>
            Password
            <input
              className={inputClass}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn size={16} />
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <Link
          to="/admin/forgot-password"
          className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
