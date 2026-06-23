'use client'

import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useLanguage } from '@/components/providers'

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/212600000000', Icon: MessageCircle },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'TikTok', href: 'https://tiktok.com', Icon: Music2 },
]

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t('footer_tagline')}
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('footer_explore')}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: '/menu', key: 'nav_menu' as const },
              { href: '/delivery', key: 'nav_delivery' as const },
              { href: '/about', key: 'nav_about' as const },
              { href: '/contact', key: 'nav_contact' as const },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-foreground/80 transition-colors hover:text-accent"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('footer_legal')}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: '/legal/privacy', key: 'privacy' as const },
              { href: '/legal/terms', key: 'terms' as const },
              { href: '/legal/delivery', key: 'delivery_info' as const },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-foreground/80 transition-colors hover:text-accent"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('nav_account')}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: '/account', key: 'account_profile' as const },
              { href: '/account/orders', key: 'account_orders' as const },
              { href: '/account/favorites', key: 'account_favorites' as const },
              { href: '/account/loyalty', key: 'account_loyalty' as const },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-foreground/80 transition-colors hover:text-accent"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {year} Tortello. {t('rights')}
        </div>
      </div>
    </footer>
  )
}
