import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  CreditCard,
  Database,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  School,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Users,
  WalletCards,
} from "lucide-react";

export const brand = {
  name: "Hikmah IT",
  tagline: "Smart Digital Solution for Business & Education",
  phone: "01624114405",
  whatsapp: "https://wa.me/8801624114405",
  email: "hikmahitcenter@gmail.com",
  location: "Bangladesh",
  facebook: "https://facebook.com/hikmahitbd",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "E-commerce", href: "#ecommerce" },
  { label: "Hosting", href: "#hosting" },
  { label: "Madrasah System", href: "#madrasah" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "5+", label: "Main Services" },
  { value: "100%", label: "Responsive UI" },
  { value: "Bkash", label: "BD Payment" },
  { value: "SEO", label: "Ready Structure" },
];

export const services = [
  {
    icon: ShoppingBag,
    title: "Full E-commerce Website",
    text: "Product, order, customer, payment, delivery and reporting system with a clean admin panel.",
    href: "#ecommerce",
  },
  {
    icon: School,
    title: "Madrasah Management System",
    text: "Student, teacher, accounting, attendance, fee, result, notice and public website control system.",
    href: "#madrasah",
  },
  {
    icon: Building2,
    title: "Business Website",
    text: "Company website, service website, portfolio website and single page landing website for leads.",
    href: "#business-websites",
  },
  {
    icon: MonitorSmartphone,
    title: "Portfolio Website",
    text: "Personal brand, agency, professional profile and work showcase website with strong visual layout.",
    href: "#business-websites",
  },
  {
    icon: Rocket,
    title: "Landing Page Website",
    text: "Single page campaign website for product, course, event or service promotion with WhatsApp CTA.",
    href: "#business-websites",
  },
  {
    icon: ServerCog,
    title: "Hosting & Domain Service",
    text: "Domain support plus international hosting purchase/payment/setup support; we do not sell our own hosting.",
    href: "#hosting",
  },
];

export const businessWebsiteTypes = [
  {
    title: "Landing Page",
    tag: "Campaign Website",
    text: "A focused single-page website for product, service, course, event or offer promotion with clear call-to-action.",
  },
  {
    title: "Portfolio Website",
    tag: "Professional Showcase",
    text: "A polished portfolio website for personal brand, freelancer, agency or company profile with project showcase and contact flow.",
  },
  {
    title: "Business Website",
    tag: "Company Website",
    text: "A complete business website for company profile, services, about, contact, trust-building and lead generation.",
  },
];

export const ecommerceFeatures = [
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    text: "Sales overview, orders, customers, products and quick business insights.",
  },
  {
    icon: PackageCheck,
    title: "Product Management",
    text: "Category, stock, gallery, variant, discount and featured product control.",
  },
  {
    icon: WalletCards,
    title: "Order & Payment",
    text: "Cash on delivery, mobile banking, payment status and delivery workflow.",
  },
  {
    icon: Users,
    title: "Customer Panel",
    text: "Customer account, order tracking, wishlist and profile management.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Store",
    text: "Fast and polished shopping experience for phone, tablet and desktop.",
  },
  {
    icon: Search,
    title: "SEO Ready Pages",
    text: "Product SEO, meta data, clean URLs and search-friendly site structure.",
  },
];

export const hostingFeatures = [
  "Domain name selection, availability checking and provider-based purchase guidance",
  ".com, .net, .org and other extensions arranged based on current provider price",
  "Domain support remains ৳1,500+ with purchase and DNS setup assistance",
  "Hosting is purchased from international providers like Hostinger or Namecheap in the customer name",
  "Bangladesh payment support through bKash, Nagad, Rocket or BD gateway",
  "Hosting provider bill is separate; our hosting purchase/setup service charge is ৳300",
];

export const madrasahFeatures = [
  {
    icon: GraduationCap,
    title: "Student Management",
    text: "Admission, profile, guardian details, class, section and roll management.",
  },
  {
    icon: Users,
    title: "Teacher & Staff",
    text: "Teacher profile, staff information, department and permission control.",
  },
  {
    icon: Calculator,
    title: "Accounting Module",
    text: "Income, expense, salary, fee collection, due report and financial summary.",
  },
  {
    icon: BookOpen,
    title: "Class & Exam",
    text: "Class routine, subject, exam, result and academic report management.",
  },
  {
    icon: Megaphone,
    title: "Notice & Website",
    text: "Admin controlled public website, notice, gallery, events and admission info.",
  },
  {
    icon: FileText,
    title: "ID & Reports",
    text: "Student list, attendance, certificate and downloadable reports.",
  },
];

export const process = [
  {
    step: "01",
    title: "Requirement",
    text: "We understand your business, package, domain need, international hosting purchase flow and target customers.",
  },
  {
    step: "02",
    title: "Design",
    text: "We prepare clean UI direction with brand color, layout and conversion sections.",
  },
  {
    step: "03",
    title: "Development",
    text: "We build responsive pages, reusable components and admin-ready structure.",
  },
  {
    step: "04",
    title: "Launch",
    text: "We test, optimize, deploy and guide you for content and future maintenance.",
  },
];

export const pricingGroups = [
  {
    title: "Website Packages",
    plans: [
      {
        name: "Landing Page",
        price: "৳5,000",
        text: "Single page conversion website for service, product, course or campaign.",
        features: [
          "Premium one-page design",
          "Hero, features, pricing and CTA",
          "WhatsApp/Facebook CTA",
          "Fast mobile responsive UI",
          "Hosting setup support",
          "Domain separate purchase",
        ],
        highlighted: false,
      },
      {
        name: "Portfolio Website",
        price: "৳7,000",
        text: "Professional portfolio website for personal brand, freelancer, agency or business profile.",
        features: [
          "Home/about/portfolio/contact",
          "Project showcase gallery",
          "Clickable live project links",
          "Client review section",
          "SEO-ready structure",
          "Hosting setup support",
          "Domain separate purchase",
        ],
        highlighted: true,
      },
      {
        name: "Business Website",
        price: "৳9,000",
        text: "Company/service website for small business, institute, shop or organization.",
        features: [
          "Professional business homepage",
          "Service details section",
          "Lead generation CTA",
          "Google map/contact section",
          "Basic SEO structure",
          "Hosting setup support",
          "Domain separate purchase",
        ],
        highlighted: false,
      },
    ],
  },
  {
    title: "E-commerce Website & Madrasah Software",
    plans: [
      {
        name: "Advanced E-commerce",
        price: "৳15,000",
        text: "Recommended online shop package with advanced admin panel and complete selling features.",
        features: [
          "Advanced admin panel",
          "Product/category/stock control",
          "Order and payment status",
          "Courier tracking workflow",
          "One-click courier entry flow",
          "Customer order tracking",
          "Hosting setup support",
          "Training/support guidance",
        ],
        highlighted: true,
      },
      {
        name: "E-commerce + Reseller Panel",
        price: "৳35,000",
        text: "Premium e-commerce system with all advanced features plus reseller panel.",
        features: [
          "Everything in Advanced package",
          "Reseller panel included",
          "Reseller order management",
          "Advanced reporting workflow",
          "Role-based dashboard flow",
          "Hosting setup support",
          "Best for growing online business",
        ],
        highlighted: false,
      },
      {
        name: "Madrasah Management Software",
        price: "Custom",
        text: "Institution management software with academic, accounting and website-control modules.",
        features: [
          "Student/teacher module",
          "Fee/accounting module",
          "Income/expense/salary",
          "Result/attendance",
          "Public website control",
          "Role-based access",
        ],
        highlighted: false,
      },
    ],
  },
  {
    title: "Domain & Hosting Support",
    plans: [
      {
        name: "Domain Purchase Support",
        price: "৳1,500+",
        text: "International provider থেকে domain কিনতে সহায়তা।",
        features: [
          "Domain name consultation",
          ".com/.net/.org guidance",
          "Availability checking",
          "Provider-based purchase help",
          "Final price depends on extension/provider",
        ],
        highlighted: false,
      },
      {
        name: "Hosting Purchase Support",
        price: "৳300 service charge",
        text: "Trusted international provider থেকে hosting কিনতে BD payment support।",
        features: [
          "Hostinger/Namecheap purchase help",
          "bKash/Nagad/Rocket/BD gateway support",
          "Provider bill customer pays separately",
        ],
        highlighted: true,
      },
    ],
  },
];

export const portfolio = [
  {
    title: "Online Store Preview",
    category: "E-commerce + Admin Panel",
    image: "/hero.png",
    url: "https://example.com",
    text: "Product, order, payment and admin-panel based online shop preview.",
  },
  {
    title: "Company Website Preview",
    category: "Business Website",
    image: "/worker.png",
    url: "https://example.com",
    text: "Professional company website layout for service and lead generation.",
  },
  {
    title: "Campaign Page Preview",
    category: "Landing Page",
    image: "/hero.png",
    url: "https://example.com",
    text: "One-page offer, campaign or product promotion website preview.",
  },
];

export const faq = [
  {
    q: "E-commerce website e admin panel thakbe?",
    a: "Yes, product, category, order, customer, payment status and delivery control er admin panel structure thakbe.",
  },
  {
    q: "Portfolio, landing page and business website er price koto?",
    a: "Landing page ৳5,000, portfolio website ৳7,000, business website ৳9,000. Ei package gulote hosting support free, but domain alada kinতে হবে.",
  },
  {
    q: "Hosting/domain ki bKash, Rocket ba Nagad diye nite parbo?",
    a: "Yes. Domain purchase support ৳1,500+ theke start. Hosting amra nijera sell kori na; Hostinger/Namecheap er moto international provider theke purchase support kori. bKash, Nagad, Rocket/BD gateway payment support thakbe. Hosting service charge ৳300, provider bill separate.",
  },
  {
    q: "Madrasah system e accounting module thakbe?",
    a: "Yes, income, expense, salary, fee collection, due report and financial summary option add kora hoyeche.",
  },
];

export const trustItems = [
  { icon: ShieldCheck, title: "Secure Structure" },
  { icon: MonitorSmartphone, title: "Responsive Design" },
  { icon: Database, title: "Admin-ready Flow" },
  { icon: Headphones, title: "Support Friendly" },
  { icon: Rocket, title: "Fast Loading" },
  { icon: BadgeCheck, title: "Professional UI" },
  { icon: LockKeyhole, title: "Trust Focused" },
  { icon: BarChart3, title: "Growth Ready" },
];
