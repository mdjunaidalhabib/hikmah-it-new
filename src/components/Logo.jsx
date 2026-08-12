export default function Logo({ src, className }) {
  return (
    <img
      className={className || "h-10 w-auto shrink-0 object-contain object-left sm:h-11 lg:h-12"}
      src={src || "/hikmah-it-navbar-logo.svg"}
      width={155}
      height={48}
      alt="Hikmah IT"
    />
  )
}
