import SectionHeader from '../components/SectionHeader'
import { faq } from '../data/siteData'

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq-wrap">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          text="Short answers for clients before they contact you."
        />
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
