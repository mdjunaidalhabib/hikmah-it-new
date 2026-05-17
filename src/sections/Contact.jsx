import { Globe2, Mail, MapPin, PhoneCall, Send } from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { brand } from "../data/siteData";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:ring-3 focus:ring-green-100";

const contactItem =
  "flex items-center gap-3 rounded-xl border border-green-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-green-300 hover:text-green-700";

export default function Contact() {
  return (
    <section
      className="bg-gradient-to-br from-[#e6f4ea] via-[#f7fbf8] to-[#e9f7ef] py-20 text-slate-950 lg:py-12"
      id="contact"
    >
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        {/* 🔥 Top Center Heading */}
        <SectionHeader
          align="center"
          eyebrow="Contact"
          title="Ready to make your website professional?"
          text="Send project details: business type, needed package, hosting/domain requirement, admin panel features and launch target."
        />

        {/* 🔽 নিচে content */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* 📞 Left Side */}
          <div>
            <div className="grid gap-3">
              <a className={contactItem} href={brand.phoneHref}>
                <PhoneCall size={18} />
                <span>{brand.phone}</span>
              </a>

              <a className={contactItem} href={brand.emailHref}>
                <Mail size={18} />
                <span>{brand.email}</span>
              </a>

              <a
                className={contactItem}
                href={brand.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 size={18} />
                <span>Visit Facebook Page</span>
              </a>

              <div className={contactItem}>
                <MapPin size={18} />
                <span>{brand.location}</span>
              </div>
            </div>
          </div>

          {/* 📝 Right Side Compact Form */}
          <div className="flex justify-center lg:justify-end">
            <form
              className="w-full max-w-md grid gap-3 rounded-2xl bg-white p-5 text-slate-950 border border-green-100 shadow-xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-sm font-medium text-slate-700">
                Name
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Phone
                <input
                  className={inputClass}
                  type="tel"
                  placeholder="Your phone number"
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Service
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select service
                  </option>
                  <option>E-commerce Website</option>
                  <option>Madrasah Management System</option>
                  <option>Business Website</option>
                  <option>Portfolio Website</option>
                  <option>Landing Page</option>
                  <option>Hosting & Domain</option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Message
                <textarea
                  className={inputClass}
                  rows="3"
                  placeholder="Write your project details"
                />
              </label>

              <Button href={brand.whatsapp}>
                <Send size={16} /> Send on WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
