'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCart, useLanguage } from '@/components/providers'
import type { DictKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const links: { href: string; key: DictKey }[] = [
  { href: '/', key: 'nav_home' },
  { href: '/menu', key: 'nav_menu' },
  { href: '/delivery', key: 'nav_delivery' },
  { href: '/about', key: 'nav_about' },
  { href: '/contact', key: 'nav_contact' },
]

export function SiteHeader() {
  const { t } = useLanguage()
  const { count, setOpen } = useCart()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(l.key)}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Link
            href="/account"
            aria-label={t('nav_account')}
            className="hidden size-9 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-muted sm:grid"
          >
            <User className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('your_cart')}
            className="relative grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="grid size-9 place-items-center rounded-full border border-border bg-background/60 text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-base font-medium',
                  pathname === l.href
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              href="/account"
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
            >
              {t('nav_account')}
            </Link>
            <div className="mt-2 px-1">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
