export default function Logo({ dark = false }) {
  return (
    <a className={`brand brand-image ${dark ? 'brand-image-dark' : ''}`} href="#home" aria-label="Hikmah IT home">
      <img src="/hikmah-it-logo.png" alt="Hikmah IT" />
    </a>
  )
}
