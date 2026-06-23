'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gift, Heart, Receipt, UserRound } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import type { DictKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const tabs: { href: string; key: DictKey; icon: typeof UserRound }[] = [
  { href: '/account', key: 'account_profile', icon: UserRound },
  { href: '/account/orders', key: 'account_orders', icon: Receipt },
  { href: '/account/favorites', key: 'account_favorites', icon: Heart },
  { href: '/account/loyalty', key: 'account_loyalty', icon: Gift },
]

export function AccountNav() {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'border-transparent bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            <tab.icon className="size-4" />
            {t(tab.key)}
          </Link>
        )
      })}
    </nav>
  )
}
