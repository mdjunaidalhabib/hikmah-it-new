import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import Button from "./Button";
import { brand } from "../data/siteData";
import { apiPost } from "../lib/api";
import { useLanguage } from "../i18n/LanguageContext";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100 focus-visible:ring-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-500/20";
const invalidInputClass =
  "mt-1 w-full rounded-xl border border-red-400 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-3 focus:ring-red-100 dark:border-red-500 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-red-500/20";

const requiredFields = ["name", "phone"];

export default function ContactForm({ className = "" }) {
  const { t, tList } = useLanguage();
  const serviceOptions = tList("contactForm.serviceOptions");
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [status, setStatus] = useState("idle");

  const fieldClass = (name) => (invalidFields.includes(name) ? invalidInputClass : inputClass);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim() && invalidFields.includes(name)) {
      setInvalidFields((prev) => prev.filter((f) => f !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = requiredFields.filter((field) => !form[field].trim());
    if (missing.length > 0) {
      setInvalidFields(missing);
      setError(t("contactForm.requiredError"));
      return;
    }

    setInvalidFields([]);
    setError("");
    setStatus("sending");

    try {
      await apiPost("/public/contact", form);
      setStatus("sent");
      toast.success(t("contactForm.sentToast"));
    } catch (err) {
      setStatus("idle");
      toast.error(err.message);
    }

    const message = [
      t("contactForm.waGreeting"),
      "",
      `${t("contactForm.waName")}: ${form.name.trim()}`,
      `${t("contactForm.waPhone")}: ${form.phone.trim()}`,
      `${t("contactForm.waService")}: ${form.service || t("contactForm.waNotSpecified")}`,
      `${t("contactForm.waMessage")}: ${form.message.trim() || "-"}`,
    ].join("\n");

    const url = `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (status === "sent") {
    return (
      <div className={`rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center shadow-xl dark:border-emerald-800/40 dark:bg-emerald-500/10 ${className}`}>
        <p className="font-semibold text-emerald-700 dark:text-emerald-400">{t("contactForm.sentTitle")}</p>
      </div>
    );
  }

  return (
    <form
      className={`grid gap-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-xl dark:border-brand-800/40 dark:bg-slate-900 ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {t("contactForm.name")} <span className="text-red-500">*</span>
        <input
          className={fieldClass("name")}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("contactForm.namePlaceholder")}
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {t("contactForm.phone")} <span className="text-red-500">*</span>
        <input
          className={fieldClass("phone")}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t("contactForm.phonePlaceholder")}
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {t("contactForm.service")}
        <select className={inputClass} name="service" value={form.service} onChange={handleChange}>
          <option value="">{t("contactForm.selectService")}</option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {t("contactForm.message")}
        <textarea
          className={inputClass}
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="3"
          placeholder={t("contactForm.messagePlaceholder")}
        />
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        <Send size={16} /> {status === "sending" ? t("contactForm.sending") : t("contactForm.sendViaWhatsapp")}
      </Button>
    </form>
  );
}
