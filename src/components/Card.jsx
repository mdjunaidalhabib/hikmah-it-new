export function FeatureCard({ icon: Icon, title, text }) {
  return (
    <article className="card feature-card">
      <div className="card-icon">{Icon && <Icon size={24} />}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export function ServiceCard({ icon: Icon, title, text, href }) {
  return (
    <a className="card service-card" href={href}>
      <div className="card-icon">{Icon && <Icon size={26} />}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="learn-more">Explore service →</span>
    </a>
  )
}
