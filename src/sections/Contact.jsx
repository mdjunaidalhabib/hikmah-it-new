import { Clock3, Globe2, Mail, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import { brand } from "../data/siteData";

const contactItem =
  "group flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-lg";

export default function Contact() {
  return (
    <section className="bg-brand-50 py-8 text-slate-950 lg:py-12" id="contact">
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        <SectionHeader
          align="center"
          eyebrow="যোগাযোগ"
          title="আপনার ওয়েবসাইট প্রফেশনাল করতে প্রস্তুত?"
          text="প্রজেক্টের বিস্তারিত পাঠান: ব্যবসার ধরন, প্রয়োজনীয় প্যাকেজ, হোস্টিং/ডোমেইন প্রয়োজনীয়তা, অ্যাডমিন প্যানেল ফিচার এবং লঞ্চ টার্গেট।"
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
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
                <span>ফেসবুক পেজ দেখুন</span>
              </a>

              <div className={contactItem}>
                <MapPin size={18} />
                <span>{brand.location}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-brand-50/70 px-4 py-3 text-sm font-medium text-brand-800">
                <Clock3 size={18} className="shrink-0 text-brand-600" />
                <span>সাধারণত ২৪ ঘণ্টার মধ্যে রিপ্লাই</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50/70 px-4 py-3 text-sm font-medium text-emerald-800">
                <ShieldCheck size={18} className="shrink-0 text-emerald-600" />
                <span>বিনামূল্যে পরামর্শ</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ContactForm className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
