export default function Logo({ dark = false }) {
  return (
    <a className="brand" href="#home" aria-label="Hikmah IT home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-h">H</span>
        <span className="pixel pixel-one" />
        <span className="pixel pixel-two" />
        <span className="pixel pixel-three" />
      </span>
      <span className="brand-text">
        <span className={dark ? 'text-light' : ''}>Hikmah</span>
        <strong>IT</strong>
      </span>
    </a>
  )
}
