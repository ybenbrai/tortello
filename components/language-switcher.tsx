'use client'

import { useLanguage } from '@/components/providers'
import { LOCALES } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-background/60 p-0.5',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={cn(
            'min-w-8 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
            locale === l.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
