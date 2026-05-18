import { Globe2, ServerCog, CheckCircle2 } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { brand } from "../data/siteData";

export default function Hosting() {
  const card =
    "rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl";

  const iconBox =
    "grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white";

  const listItem =
    "flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[15px] leading-6 text-slate-700";

  return (
    <section
      id="hosting"
      className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-16"
    >
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow="Domain & Hosting Support"
            title="Domain Buying & Hosting Payment Assistance"
            text="We help customers buy domains from international providers and provide payment assistance for hosting purchases from trusted global platforms."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Domain Card */}
          <article className={card}>
            <div className="flex items-center gap-4">
              <div className={iconBox}>
                <Globe2 size={28} />
              </div>

              <div>
                <span className="text-sm font-medium text-blue-700">
                  Domain Buying Support
                </span>

                <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                  Buy Domain from International Sites
                </h3>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm text-slate-500">Starting From</p>

              <strong className="mt-1 block text-3xl font-semibold text-blue-700">
                ৳1,500+
              </strong>

              <p className="mt-2 text-sm text-slate-600">
                Domain price depends on provider, extension, and availability.
              </p>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              We assist you in buying domains from trusted international domain
              providers such as Namecheap, GoDaddy, Hostinger, or similar
              platforms.
            </p>

            <div className="my-5 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 p-2 pl-5 text-slate-500">
              <span>yourbusiness.com</span>

              <button className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white">
                Check
              </button>
            </div>

            <ul className="grid gap-3">
              {[
                "Domain name research and availability checking",
                "Domain purchase support from international platforms",
                "Extension guidance for .com, .net, .org, and others",
                "Basic domain setup support after purchase",
              ].map((item) => (
                <li key={item} className={listItem}>
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Hosting Card */}
          <article className={card}>
            <div className="flex items-center gap-4">
              <div className={iconBox}>
                <ServerCog size={28} />
              </div>

              <div>
                <span className="text-sm font-medium text-blue-700">
                  Hosting Payment Support
                </span>

                <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                  Hosting Payment Assistance Only
                </h3>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-sm text-slate-500">Service Charge</p>

              <strong className="mt-1 block text-3xl font-semibold text-amber-700">
                ৳300
              </strong>

              <p className="mt-2 text-sm text-slate-600">
                Hosting bill will be paid directly to the provider by the
                customer.
              </p>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              We do not sell or provide hosting directly. We only help customers
              complete payments for hosting plans from trusted international
              providers.
            </p>

            <ul className="mt-5 grid gap-3">
              {[
                "Payment assistance for international hosting providers",
                "Support for Hostinger, Namecheap, GoDaddy, or similar platforms",
                "bKash, Nagad, Rocket, or local gateway payment support",
                "Customer pays the provider bill; our service charge is ৳300",
              ].map((item) => (
                <li key={item} className={listItem}>
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={brand.whatsapp}>Order Support</Button>

          <Button href="#contact" variant="ghost-dark">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
