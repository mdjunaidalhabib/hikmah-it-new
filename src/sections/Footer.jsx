import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { quickLinks, brand } from "../data/siteData";
import useSiteSettings from "../lib/useSiteSettings";
import { useUserAuth } from "../context/UserAuthContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { user } = useUserAuth();
  const { t } = useLanguage();
  const link = "mb-2 block text-slate-400 transition hover:text-brand-400";

  const phone = settings?.phone || brand.phone;
  const phoneHref = settings?.phone ? `tel:+88${settings.phone.replace(/\D/g, "")}` : brand.phoneHref;
  const email = settings?.email || brand.email;
  const emailHref = settings?.email ? `mailto:${settings.email}` : brand.emailHref;
  const location = settings?.location || t("brand.location");
  const facebook = settings?.facebook || brand.facebook;
  const about = settings?.footerAbout || `${t("brand.tagline")}. ${t("footer.aboutFallback")}`;

  const heading = "mb-5 flex items-center gap-2 font-semibold text-white";
  const accent = <span className="h-4 w-1 rounded-full bg-gradient-to-b from-brand-400 to-amber-400" />;

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 pb-6 pt-16 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-amber-400" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-[36rem] -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-[28rem] translate-x-1/3 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_.9fr] lg:gap-6">
        <div>
          <Link to="/" aria-label={t("common.homeAriaLabel")} className="inline-block transition hover:-translate-y-0.5">
            <Logo
              src={settings?.logoUrl}
              className={`h-16 w-[206px] shrink-0 object-contain object-left sm:h-20 sm:w-[258px] ${settingsLoading ? "invisible" : ""}`}
            />
          </Link>
          <p className="mt-5 max-w-sm leading-8 text-slate-400">{about}</p>
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} {t("footer.quickLinks")}</h4>
          {quickLinks.map((item) => (
            <Link className={link} key={item.href} to={item.href}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          {user ? (
            <Link className={link} to="/profile">
              {t("common.myProfile")}
            </Link>
          ) : (
            <>
              <Link className={link} to="/login">
                {t("common.login")}
              </Link>
              <Link className={link} to="/signup">
                {t("common.signup")}
              </Link>
            </>
          )}
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} {t("footer.mainServices")}</h4>
          <Link className={link} to="/ecommerce">
            {t("footer.ecommerceWebsite")}
          </Link>
          <Link className={link} to="/madrasah">
            {t("footer.madrasahManagement")}
          </Link>
          <Link className={link} to="/business">
            {t("footer.portfolioWebsite")}
          </Link>
          <Link className={link} to="/business">
            {t("footer.landingPage")}
          </Link>
          <Link className={link} to="/hosting">
            {t("footer.hostingDomain")}
          </Link>
          <Link className={link} to="/earn">
            {t("footer.earnOnline")}
          </Link>
        </div>

        <div className="lg:border-l lg:border-slate-800 lg:pl-6">
          <h4 className={heading}>{accent} {t("footer.contact")}</h4>
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
              <ExternalLink size={14} className="text-brand-400" /> {t("footer.viewFacebook")}
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex w-[min(1180px,calc(100%-40px))] flex-col items-center gap-3 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
        <span>© {new Date().getFullYear()} Hikmah IT. {t("footer.allRightsReserved")}</span>
        <div className="flex items-center gap-4">
          <Link className="transition hover:text-brand-400" to="/privacy-policy">{t("footer.privacyPolicy")}</Link>
          <Link className="transition hover:text-brand-400" to="/terms-of-service">{t("footer.termsOfService")}</Link>
        </div>
        <span className="text-slate-600">{t("footer.designedIn")}</span>
      </div>
    </footer>
  );
}
