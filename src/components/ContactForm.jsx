import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import Button from "./Button";
import { brand } from "../data/siteData";
import { apiPost } from "../lib/api";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-3 focus:ring-brand-100 focus-visible:ring-3";
const invalidInputClass =
  "mt-1 w-full rounded-xl border border-red-400 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-3 focus:ring-red-100";

const requiredFields = ["name", "phone"];

const serviceOptions = [
  "ই-কমার্স ওয়েবসাইট",
  "মাদরাসা ম্যানেজমেন্ট সিস্টেম",
  "বিজনেস ওয়েবসাইট",
  "পোর্টফোলিও ওয়েবসাইট",
  "ল্যান্ডিং পেজ",
  "হোস্টিং ও ডোমেইন",
];

export default function ContactForm({ className = "" }) {
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
      setError("অনুগ্রহ করে লাল চিহ্নিত সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    setInvalidFields([]);
    setError("");
    setStatus("sending");

    try {
      await apiPost("/public/contact", form);
      setStatus("sent");
      toast.success("মেসেজ পাঠানো হয়েছে");
    } catch (err) {
      setStatus("idle");
      toast.error(err.message);
    }

    const message = [
      "হ্যালো Hikmah IT, আমি আপনাদের সার্ভিসে আগ্রহী।",
      "",
      `নাম: ${form.name.trim()}`,
      `ফোন: ${form.phone.trim()}`,
      `সার্ভিস: ${form.service || "উল্লেখ করা হয়নি"}`,
      `মেসেজ: ${form.message.trim() || "-"}`,
    ].join("\n");

    const url = `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (status === "sent") {
    return (
      <div className={`rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center shadow-xl ${className}`}>
        <p className="font-semibold text-emerald-700">আপনার মেসেজ পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।</p>
      </div>
    );
  }

  return (
    <form
      className={`grid gap-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-xl ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="text-sm font-medium text-slate-700">
        নাম <span className="text-red-500">*</span>
        <input
          className={fieldClass("name")}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="আপনার নাম"
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        ফোন <span className="text-red-500">*</span>
        <input
          className={fieldClass("phone")}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="আপনার ফোন নাম্বার"
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        সার্ভিস
        <select className={inputClass} name="service" value={form.service} onChange={handleChange}>
          <option value="">সার্ভিস নির্বাচন করুন</option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-slate-700">
        মেসেজ
        <textarea
          className={inputClass}
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="3"
          placeholder="আপনার প্রজেক্টের বিস্তারিত লিখুন"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        <Send size={16} /> {status === "sending" ? "পাঠানো হচ্ছে…" : "WhatsApp-এ পাঠান"}
      </Button>
    </form>
  );
}
