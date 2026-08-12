import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { quickLinks, brand } from "../data/siteData";
import useSiteSettings from "../lib/useSiteSettings";
import { useUserAuth } from "../context/UserAuthContext";

export default function Footer() {
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { user } = useUserAuth();
  const link = "mb-2 block text-slate-400 transition hover:text-brand-400";

  const phone = settings?.phone || brand.phone;
  const phoneHref = settings?.phone ? `tel:+88${settings.phone.replace(/\D/g, "")}` : brand.phoneHref;
  const email = settings?.email || brand.email;
  const emailHref = settings?.email ? `mailto:${settings.email}` : brand.emailHref;
  const location = settings?.location || brand.location;
  const facebook = settings?.facebook || brand.facebook;
  const about = settings?.footerAbout || `${brand.tagline}। আমরা আধুনিক ওয়েবসাইট, ই-কমার্স প্ল্যাটফর্ম, ডোমেইন/হোস্টিং সাপোর্ট এবং প্রতিষ্ঠান ম্যানেজমেন্ট সলিউশন তৈরি করি।`;

  const heading = "mb-5 flex items-center gap-2 font-semibold text-white";
  const accent = <span className="h-4 w-1 rounded-full bg-gradient-to-b from-brand-400 to-amber-400" />;

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 pb-6 pt-16 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-amber-400" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-[36rem] -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-[28rem] translate-x-1/3 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_.9fr] lg:gap-6">
        <div>
          <Link to="/" aria-label="Hikmah IT হোম" className="inline-block transition hover:-translate-y-0.5">
            <Logo
              src={settings?.logoUrl}
              className={`h-16 w-[206px] shrink-0 object-contain object-left sm:h-20 sm:w-[258px] ${settingsLoading ? "invisible" : ""}`}
            />
          </Link>
          <p className="mt-5 max-w-sm leading-8 text-slate-400">{about}</p>
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} কুইক লিংক</h4>
          {quickLinks.map((item) => (
            <Link className={link} key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
          {user ? (
            <Link className={link} to="/profile">
              আমার প্রোফাইল
            </Link>
          ) : (
            <>
              <Link className={link} to="/login">
                লগইন
              </Link>
              <Link className={link} to="/signup">
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} প্রধান সার্ভিস</h4>
          <Link className={link} to="/ecommerce">
            ই-কমার্স ওয়েবসাইট
          </Link>
          <Link className={link} to="/madrasah">
            মাদরাসা ম্যানেজমেন্ট
          </Link>
          <Link className={link} to="/business">
            পোর্টফোলিও ওয়েবসাইট
          </Link>
          <Link className={link} to="/business">
            ল্যান্ডিং পেজ
          </Link>
          <Link className={link} to="/hosting">
            হোস্টিং ও ডোমেইন
          </Link>
          <Link className={link} to="/earn">
            অনলাইনে আয় করুন
          </Link>
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} যোগাযোগ</h4>
          <div className="grid gap-2">
            <Button href={phoneHref} variant="ghost" className="!justify-start !border-white/10 !bg-white/5 !px-4 !py-2 !text-xs hover:!bg-white/10">
              <Phone size={14} className="text-brand-400" /> {phone}
            </Button>
            <Button href={emailHref} variant="ghost" className="!justify-start !border-white/10 !bg-white/5 !px-4 !py-2 !text-xs hover:!bg-white/10">
              <Mail size={14} className="text-brand-400" /> {email}
            </Button>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white">
              <MapPin size={14} className="shrink-0 text-brand-400" /> {location}
            </span>
            <Button href={facebook} variant="ghost" className="!justify-start !border-white/10 !bg-white/5 !px-4 !py-2 !text-xs hover:!bg-white/10">
              <ExternalLink size={14} className="text-brand-400" /> ফেসবুক পেজ দেখুন
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex w-[min(1180px,calc(100%-40px))] flex-col items-center gap-2 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
        <span>© {new Date().getFullYear()} Hikmah IT। সর্বস্বত্ব সংরক্ষিত।</span>
        <span className="text-slate-600">Designed &amp; developed with care in Bangladesh</span>
      </div>
    </footer>
  );
}
