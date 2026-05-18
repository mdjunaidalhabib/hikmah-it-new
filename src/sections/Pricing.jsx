import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { pricingGroups } from "../data/siteData";

export default function Pricing() {
  return (
    <section
      className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-8 lg:py-12"
      id="pricing"
    >
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="Packages"
          title="Professional service packages"
        />

        <div className="grid gap-12">
          {pricingGroups.map((group) => (
            <div key={group.title}>
              {/* Group Title */}
              <h3 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">
                {group.title}
              </h3>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.plans.map((plan) => (
                  <article
                    key={plan.name}
                    className={`flex flex-col h-full rounded-[2rem] border p-7 shadow-xl transition hover:shadow-2xl ${
                      plan.highlighted
                        ? "border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 shadow-blue-950/10 ring-2 ring-blue-100 lg:-translate-y-2"
                        : "border-slate-200 bg-white shadow-slate-950/5"
                    }`}
                  >
                    {/* Badge */}
                    {plan.highlighted && (
                      <span className="mb-4 inline-block w-fit rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900 shadow-sm">
                        Recommended
                      </span>
                    )}

                    {/* Content */}
                    <div>
                      {/* Plan Name */}
                      <h3 className="text-2xl font-semibold text-slate-900">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <strong className="mt-3 block text-3xl font-bold text-blue-600">
                        {plan.price}
                      </strong>

                      {/* Description */}
                      <p className="mt-3 leading-7 text-slate-600">
                        {plan.text}
                      </p>

                      {/* Features */}
                      <ul className="my-6 grid gap-3 text-slate-700">
                        {plan.features.map((feature) => (
                          <li key={feature}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Button at bottom */}
                    <div className="mt-auto">
                      <Button
                        href="#contact"
                        variant={plan.highlighted ? "primary" : "ghost-dark"}
                      >
                        Choose Package
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
