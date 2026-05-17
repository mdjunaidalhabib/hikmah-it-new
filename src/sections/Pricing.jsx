import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { pricingGroups } from '../data/siteData'

export default function Pricing() {
  return (
    <section className="bg-gradient-to-br from-[#eef6ff] via-[#f8fbff] to-[#e9f1ff] py-20 lg:py-12" id="pricing">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <SectionHeader eyebrow="Packages" title="Professional service packages" />
        <div className="grid gap-12">
          {pricingGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-3xl font-black tracking-[-0.04em] text-slate-950">{group.title}</h3>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.plans.map((plan) => (
                  <article className={`${plan.highlighted ? 'border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-950 shadow-blue-950/10 ring-2 ring-blue-100 lg:-translate-y-2' : 'border-slate-200 bg-white text-slate-950 shadow-slate-950/5'} rounded-[2rem] border p-7 shadow-xl`} key={plan.name}>
                    {plan.highlighted && <span className="mb-4 inline-flex rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-slate-950">Recommended</span>}
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    <strong className="mt-3 block text-3xl font-black text-blue-600">{plan.price}</strong>
                    <p className={`${plan.highlighted ? 'text-slate-600' : 'text-slate-600'} mt-3 leading-7`}>{plan.text}</p>
                    <ul className={`${plan.highlighted ? 'text-slate-700' : 'text-slate-700'} my-6 grid gap-3`}>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                    <Button href="#contact" variant={plan.highlighted ? 'primary' : 'ghost-dark'}>Choose Package</Button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
