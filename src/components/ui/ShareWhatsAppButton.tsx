import { Share2 } from 'lucide-react'
import React from 'react'

export function ShareWhatsAppButton({
  messageWhats
}: {
  messageWhats: string
}) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageWhats)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between"
    >
      <Share2 className="h-4 w-4 mr-1" />
    </a>
  )
}
