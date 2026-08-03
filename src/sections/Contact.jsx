import { Globe2, Mail, MapPin, PhoneCall } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import { brand } from "../data/siteData";

const contactItem =
  "flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 font-medium text-slate-700 shadow-md transition hover:border-blue-300 hover:text-blue-700";

export default function Contact() {
  return (
    <section className="bg-[#edf4ff] py-8 text-slate-950 lg:py-12" id="contact">
      <div className="mx-auto w-[min(1100px,calc(100%-40px))]">
        <SectionHeader
          align="center"
          eyebrow="Contact"
          title="Ready to make your website professional?"
          text="Send project details: business type, needed package, hosting/domain requirement, admin panel features and launch target."
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
                <span>Visit Facebook Page</span>
              </a>

              <div className={contactItem}>
                <MapPin size={18} />
                <span>{brand.location}</span>
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
