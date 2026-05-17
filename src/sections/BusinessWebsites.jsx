import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  MonitorSmartphone,
  Rocket,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { businessWebsiteTypes } from "../data/siteData";

const icons = [Rocket, MonitorSmartphone, Globe2];

export default function BusinessWebsites() {
  return (
    <section
      className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-12"
      id="business-websites"
    >
      {/* Heading */}
      <div className="mx-auto w-[min(900px,calc(100%-40px))] text-center mb-12">
        <SectionHeader
          align="center"
          eyebrow="Business Website"
          title="Landing page, portfolio website ও business website"
          text="Professional website solutions for personal brand, service business, company profile and campaign-focused online presence. Package price details are shown in the pricing section."
        />
      </div>

      {/* Main content */}
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-10 lg:grid-cols-2">
        {/* Left Side */}
        <div>
          <div className="grid gap-4">
            {businessWebsiteTypes.map((item, index) => {
              const Icon = icons[index];

              return (
                <article
                  className="relative flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-950/5"
                  key={item.title}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      {item.title}
                    </h3>
                    <small className="font-extrabold text-blue-700">
                      {item.tag}
                    </small>
                    <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                  </div>

                  <ArrowRight
                    className="absolute right-5 top-5 text-blue-600"
                    size={18}
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 text-slate-950 shadow-2xl shadow-blue-950/10">
          {/* Preview header */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <strong className="ml-2 text-sm">Website Preview</strong>
          </div>

          {/* Main preview */}
          <div className="rounded-3xl border border-blue-100 bg-white p-7">
            <small className="font-extrabold text-blue-700">
              Professional Website
            </small>

            <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em]">
              Build trust, showcase your work and collect leads
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Modern layout, service highlights, portfolio area, testimonials
              and WhatsApp/Facebook contact flow.
            </p>
          </div>

          {/* Features moved here */}
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-extrabold text-slate-700">
            {[
              "Clean responsive design",
              "Lead focused structure",
              "Domain separate",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-blue-100"
              >
                <CheckCircle2 size={16} /> {item}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="#pricing">See Website Packages</Button>
            <Button href="#portfolio" variant="ghost-dark">
              View Showcase
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
