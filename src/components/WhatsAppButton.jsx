import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { brand } from "../data/siteData";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      className={`
        group fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[60]
        flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_24px_rgba(37,211,102,0.45)]
        transition-all duration-500 ease-out
        will-change-transform
        hover:-translate-y-1.5 hover:scale-110
        hover:shadow-[0_16px_36px_rgba(37,211,102,0.6)]
        active:scale-95
        ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-50"}
      `}
    >
      {/* Tooltip */}
      <span
        className="
          pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2
          whitespace-nowrap rounded-lg bg-hikmah-navy px-3 py-1.5 text-xs font-medium text-white
          opacity-0 translate-x-2
          shadow-lg
          transition-all duration-300 ease-out
          group-hover:opacity-100 group-hover:translate-x-0
        "
      >
        আমাদের সাথে চ্যাট করুন
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-hikmah-navy" />
      </span>

      {/* Expanding side rings */}
      <span className="absolute inset-0 rounded-full border sm:border-2 border-[#25D366] animate-wa-ripple" />
      <span
        className="absolute inset-0 rounded-full border sm:border-2 border-[#25D366] animate-wa-ripple"
        style={{ animationDelay: "1s" }}
      />

      {/* Icon */}
      <MessageCircle
        size={20}
        strokeWidth={2.4}
        className="relative z-10 sm:hidden transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
      />
      <MessageCircle
        size={24}
        strokeWidth={2.4}
        className="relative z-10 hidden sm:block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
      />
    </a>
  );
}
