// ============================================================
// Contact Constants
// Shared social links and contact components for footer and
// contact page
// ============================================================

import { Camera, MessageCircle, Music2, Share2 } from 'lucide-react'
import type { ComponentType } from 'react'

interface SocialLink {
  label: string
  href: string
  Icon: ComponentType<{ className?: string }>
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'WhatsApp', href: 'https://wa.me/212600000000', Icon: MessageCircle },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Camera },
  { label: 'Facebook', href: 'https://facebook.com', Icon: Share2 },
  { label: 'TikTok', href: 'https://tiktok.com', Icon: Music2 },
]

export function ContactLine({
  Icon,
  value,
}: {
  Icon: ComponentType<{ className?: string }>
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </span>
      <span className="text-sm text-foreground/90">{value}</span>
    </div>
  )
}
