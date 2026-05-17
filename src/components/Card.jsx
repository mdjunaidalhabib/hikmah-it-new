const cardClass = 'group rounded-3xl border border-slate-800/10 bg-white p-7 shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-950/10';
const iconClass = 'mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-slate-950 text-white shadow-lg shadow-blue-950/20';

export function FeatureCard({ icon: Icon, title, text }) {
  return (
    <article className={cardClass}>
      <div className={iconClass}>{Icon && <Icon size={24} />}</div>
      <h3 className="mb-2 text-xl font-black tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="leading-7 text-slate-600">{text}</p>
    </article>
  )
}

export function ServiceCard({ icon: Icon, title, text, href }) {
  return (
    <a className={cardClass} href={href}>
      <div className={iconClass}>{Icon && <Icon size={26} />}</div>
      <h3 className="mb-2 text-xl font-black tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="leading-7 text-slate-600">{text}</p>
      <span className="mt-5 inline-flex font-extrabold text-blue-700">Explore service →</span>
    </a>
  )
}
