import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import { pricingGroups } from '../data/siteData'

const groupClass = (title) => {
  if (title.includes('Domain')) return 'domain-pricing-group'
  if (title.includes('E-commerce')) return 'software-pricing-group'
  return 'website-pricing-group'
}

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeader
          eyebrow="Packages"
          title="Professional service packages"
        />
        <div className="pricing-groups">
          {pricingGroups.map((group) => (
            <div className={`pricing-group ${groupClass(group.title)}`} key={group.title}>
              <h3 className="pricing-group-title">{group.title}</h3>
              <div className="pricing-grid">
                {group.plans.map((plan) => (
                  <article className={`pricing-card ${plan.highlighted ? 'featured-plan' : ''}`} key={plan.name}>
                    {plan.highlighted && <span className="popular">Recommended</span>}
                    <h3>{plan.name}</h3>
                    <strong>{plan.price}</strong>
                    <p>{plan.text}</p>
                    <ul>
                      {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                    </ul>
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
