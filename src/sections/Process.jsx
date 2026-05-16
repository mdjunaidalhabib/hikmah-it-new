import SectionHeader from '../components/SectionHeader'
import { process } from '../data/siteData'

export default function Process() {
  return (
    <section className="section soft-section">
      <div className="container">
        <SectionHeader eyebrow="Work Process" title="Simple, clear and project-focused workflow" />
        <div className="process-grid">
          {process.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
