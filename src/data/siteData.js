import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  Database,
  FileText,
  GraduationCap,
  CodeXml,
  Handshake,
  Headphones,
  KeyRound,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MessageSquareText,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Send,
  UserPlus,
  Users,
  WalletCards,
  Webhook,
} from "lucide-react";

// Non-text, structural site data. All display text lives in src/i18n/locales/{en,bn}.
export const brand = {
  name: "Hikmah IT",
  phone: "01624114405",
  phoneHref: "tel:+8801624114405",
  whatsapp: "https://wa.me/8801624114405",
  email: "hikmahitcenter@gmail.com",
  emailHref: "mailto:hikmahitcenter@gmail.com",
  facebook: "https://facebook.com/hikmahitbd",
};

// Order must match src/i18n/locales/{en,bn}/common.js -> nav
export const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "portfolio", href: "/portfolio" },
  { key: "team", href: "/team" },
  { key: "about", href: "/about" },
];

export const quickLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "portfolio", href: "/portfolio" },
  { key: "team", href: "/team" },
  { key: "about", href: "/about" },
  { key: "earn", href: "/earn" },
];

// Icon sets — index-aligned with the matching arrays under `data.*` in the translation files.
export const ecommerceFeatureIcons = [LayoutDashboard, PackageCheck, WalletCards, Users, Smartphone, Search];

export const madrasahFeatureIcons = [GraduationCap, Users, Calculator, BookOpen, Megaphone, FileText];

export const trustItemIcons = [ShieldCheck, MonitorSmartphone, Database, Headphones, Rocket, BadgeCheck, LockKeyhole, BarChart3];

export const joinRoleIcons = ["🤝", "📢", "💼"];

// Quick SMS (separate product hosted at sms.hikmahit.com) — text lives in locales/{en,bn}/smsPage.js
export const smsLinks = {
  home: "https://sms.hikmahit.com",
  register: "https://sms.hikmahit.com/register",
  docs: "https://sms.hikmahit.com/docs",
  pricing: "https://sms.hikmahit.com/pricing",
  reseller: "https://sms.hikmahit.com/become-reseller",
  apiEndpoint: "https://sms.hikmahit.com/api/v1/sms/send",
};

export const smsFeatureIcons = [MessageSquareText, CodeXml, BadgeCheck, Webhook, KeyRound, Handshake, WalletCards, Languages];

export const smsStepIcons = [UserPlus, WalletCards, Send];

// Static fallback so the Quick SMS card shows even when the services list comes from the database
// (see src/lib/withSmsService.js). Title/text come from smsPage.service in the locale files.
export const smsServiceEntry = { _id: "static-quick-sms", href: "/sms", iconName: "MessageSquareText" };
