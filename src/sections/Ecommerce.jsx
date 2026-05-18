import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { FeatureCard } from "../components/Card";
import { ecommerceFeatures } from "../data/siteData";
// 👉 If using Next.js, uncomment below
// import Image from "next/image";

export default function Ecommerce() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#edf4ff] via-[#f7faff] to-[#eaf2ff] py-10 lg:py-16"
      id="ecommerce"
    >
      {/* 👉 Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />

      {/* 👉 Top Center Heading */}
      <div className="relative mx-auto mb-12 w-[min(900px,calc(100%-40px))] text-center">
        <SectionHeader
          align="center"
          eyebrow="Main Service"
          title="Full e-commerce website with powerful admin panel"
          text="A professional online store needs more than a beautiful homepage. It needs product control, order workflow, customer trust, mobile shopping and admin management."
        />
      </div>

      {/* 👉 Main Grid */}
      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-2">
        {/* 👉 Left Side */}
        <div>
          <div className="my-6 grid gap-3">
            {[
              "Product, category and stock management",
              "Order, payment and delivery status",
              "Customer account and order tracking",
              "SEO-ready product pages",
            ].map((item) => (
              <span
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                key={item}
              >
                ✓ {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="#pricing">See Packages</Button>

            <Button href="#contact" variant="ghost-dark">
              Request Demo
            </Button>
          </div>
        </div>

        {/* 👉 Right Side Premium Image Card */}
        <div className="group relative">
          {/* Glow */}
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue-400/20 blur-3xl transition duration-500 group-hover:bg-cyan-300/30" />

          {/* Gradient Border */}
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-500 via-cyan-300 to-blue-700 p-[2px] shadow-[0_25px_80px_rgba(37,99,235,0.28)] transition duration-500 group-hover:shadow-[0_30px_90px_rgba(14,165,233,0.35)]">
            {/* Inner Card */}
            <div className="overflow-hidden rounded-[1.9rem] border border-white/60 bg-white backdrop-blur-xl">
              <img
                src="/ecommerce-dashboard.webp"
                alt="Ecommerce Dashboard"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 👉 Feature Cards */}
      <div className="relative mx-auto mt-10 grid w-[min(1180px,calc(100%-40px))] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ecommerceFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
