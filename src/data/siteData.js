import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  Database,
  FileText,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  WalletCards,
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
