export default function Button({ href = '#contact', children, variant = 'primary' }) {
  return (
    <a className={`btn btn-${variant}`} href={href}>
      {children}
    </a>
  )
}
