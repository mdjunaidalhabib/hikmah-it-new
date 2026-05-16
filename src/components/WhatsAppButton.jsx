import { MessageCircle } from 'lucide-react'
import { brand } from '../data/siteData'

export default function WhatsAppButton() {
  return (
    <a className="floating-whatsapp" href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
      <MessageCircle size={24} />
    </a>
  )
}
