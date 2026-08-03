import SectionHeader from "../components/SectionHeader";
import PricingCard from "../components/PricingCard";
import { pricingGroups } from "../data/siteData";

export default function Pricing() {
  return (
    <section className="bg-[#edf4ff] py-8 lg:py-12" id="pricing">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader
          eyebrow="Packages"
          title="Professional service packages"
        />

        <div className="grid gap-12">
          {pricingGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">
                {group.title}
              </h3>

              <div className="grid gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
                {group.plans.map((plan) => (
                  <PricingCard key={plan.name} plan={plan} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
