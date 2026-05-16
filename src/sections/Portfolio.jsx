import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/siteData'

export default function Portfolio() {
  return (
    <section className="section soft-section" id="portfolio">
      <div className="container">
        <SectionHeader
          eyebrow="Project Showcase"
          title="Recent website preview gallery"
          text="E-commerce, business website, landing page, portfolio website বা software preview—সব ধরনের কাজ এখানে clean card layout এ show করা যাবে। Card click করলে live website open হবে।"
        />
        <div className="project-showcase-grid">
          {portfolio.map((item) => (
            <a className="project-card" href={item.url} target="_blank" rel="noreferrer" key={item.title}>
              <div className="project-image-wrap">
                <img src={item.image} alt={item.title} />
                <div className="project-overlay">
                  <span>Visit Website</span>
                </div>
              </div>
              <div className="project-info">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
