import { useState } from "react";
import { Send } from "lucide-react";
import Button from "./Button";
import { brand } from "../data/siteData";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-3 focus:ring-blue-100 focus-visible:ring-3";

const serviceOptions = [
  "E-commerce Website",
  "Madrasah Management System",
  "Business Website",
  "Portfolio Website",
  "Landing Page",
  "Hosting & Domain",
];

export default function ContactForm({ className = "" }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    setError("");

    const message = [
      "Hello Hikmah IT, I'm interested in your services.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Service: ${form.service || "Not specified"}`,
      `Message: ${form.message.trim() || "-"}`,
    ].join("\n");

    const url = `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className={`grid gap-3 rounded-2xl border border-blue-100 bg-white p-6 shadow-xl ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="text-sm font-medium text-slate-700">
        Name
        <input
          className={inputClass}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Phone
        <input
          className={inputClass}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Service
        <select
          className={inputClass}
          name="service"
          value={form.service}
          onChange={handleChange}
        >
          <option value="">Select service</option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-slate-700">
        Message
        <textarea
          className={inputClass}
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="3"
          placeholder="Write your project details"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <Button type="submit">
        <Send size={16} /> Send on WhatsApp
      </Button>
    </form>
  );
}
