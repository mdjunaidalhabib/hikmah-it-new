export default function SectionHeader({ eyebrow, title, text, align = 'center', light = false }) {
  return (
    <div className={`${align === 'left' ? 'mx-0 text-left' : 'mx-auto text-center'} mb-10 max-w-3xl`}>
      {eyebrow && (
        <span className={`${light ? 'border-blue-300/25 bg-blue-500/15 text-blue-100' : 'border-blue-200 bg-blue-100 text-blue-700'} inline-flex items-center rounded-full border px-3.5 py-2 text-sm font-extrabold`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`${light ? 'text-white' : 'text-slate-950'} mt-4 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl`}>{title}</h2>
      {text && <p className={`${light ? 'text-slate-300' : 'text-slate-600'} mt-4 text-base leading-8 sm:text-lg`}>{text}</p>}
    </div>
  )
}
