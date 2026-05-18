import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import Button from "../components/Button";
import { brand } from "../data/siteData";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_28%),linear-gradient(135deg,#071028_0%,#0b1736_48%,#172554_100%)] pt-10 pb-16 text-white sm:pt-14 sm:pb-20 lg:py-24"
      id="home"
    >
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-500/15 px-3.5 py-2 text-sm font-semibold text-blue-100">
            <CheckCircle2 size={18} />
            Professional Website & Software Agency
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
            E-commerce, Business Website, Hosting & Madrasah Management System.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {brand.name} helps businesses and institutions launch modern
            websites, e-commerce platforms, admin dashboards, portfolio/landing
            pages, hosting-domain support and digital management systems with
            premium UI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">
              Start Your Project <ArrowRight size={18} />
            </Button>

            <Button href="#services" variant="ghost">
              <PlayCircle size={18} /> View Services
            </Button>
          </div>
        </div>

        <div className="hidden rounded-[2rem] border border-blue-300/20 bg-white/10 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl lg:block">
          <div className="rounded-3xl border border-blue-300/15 bg-gradient-to-br from-[#13245a] via-[#0f1d44] to-[#0b1736] p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-500/20 px-3 py-1.5 text-sm font-semibold text-blue-100">
                Live Project Preview
              </span>
              <span className="text-sm text-slate-300">Premium UI</span>
            </div>

            <h3 className="max-w-sm text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
              Modern websites, e-commerce stores & management systems built for
              growth.
            </h3>

            <div className="mt-6 grid gap-3">
              {[
                "E-commerce Store",
                "Madrasah Management",
                "Portfolio & Business Website",
                "Landing Page",
                "Hosting & Domain",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-blue-300/15 bg-white/10 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-100">
                    {item}
                  </span>
                  <CheckCircle2 size={18} className="text-cyan-200" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              "Fast Delivery",
              "Responsive Design",
              "SEO Friendly",
              "Secure Setup",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-300/15 bg-blue-500/10 p-4"
              >
                <span className="text-sm font-medium text-blue-100">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
