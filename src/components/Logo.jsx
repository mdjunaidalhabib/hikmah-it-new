export default function Logo({ src }) {
  return (
    <img
      className="h-10 w-[160px] shrink-0 object-contain object-left sm:h-11 sm:w-[175px] lg:h-12 lg:w-[185px]"
      src={src || "/hikmah-it-navbar-logo.svg"}
      alt="Hikmah IT"
    />
  )
}
