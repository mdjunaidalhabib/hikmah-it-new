import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAdminAuth } from "../context/AdminAuthContext";
import { inputClass, labelClass } from "../components/ui";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import useSiteSettings from "../../lib/useSiteSettings";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <Logo
            src={settings?.logoUrl}
            className={`h-10 w-[129px] shrink-0 object-contain object-left sm:h-11 sm:w-[142px] lg:h-12 lg:w-[155px] ${settingsLoading ? "invisible" : ""}`}
          />
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
            <div className="relative">
              <input
                className={`${inputClass} pr-10`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
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
