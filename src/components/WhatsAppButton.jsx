import { MessageCircle } from 'lucide-react'
import { brand } from '../data/siteData'

export default function WhatsAppButton() {
  return (
    <a className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-700/30" href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
      <MessageCircle size={24} />
    </a>
  )
}
