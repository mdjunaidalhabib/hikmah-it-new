import { MessageCircle } from "lucide-react";
import { brand } from "../data/siteData";

export default function WhatsAppButton() {
  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      className="
        group fixed bottom-5 right-5 z-[60]
        flex h-12 w-12 items-center justify-center
        rounded-full
        bg-[#25D366] text-white
        shadow-[0_8px_24px_rgba(37,211,102,0.35)]
        transition-all duration-300
        hover:-translate-y-1 hover:scale-105
        hover:shadow-[0_12px_30px_rgba(37,211,102,0.45)]
        active:scale-95
      "
    >
      {/* Soft Glow */}
      <span
        className="
          absolute inset-0 rounded-full
          bg-[#25D366]
          opacity-20 blur-lg
          scale-125
          group-hover:opacity-35
          transition duration-300
        "
      />

      {/* Ping Effect */}
      <span
        className="
          absolute inset-0 rounded-full
          border border-white/40
          animate-ping opacity-20
        "
      />

      {/* Icon */}
      <MessageCircle size={22} strokeWidth={2.4} className="relative z-10" />
    </a>
  );
}
