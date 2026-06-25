'use client'

// ============================================================
// Hero Section
// Main homepage hero with headline, CTA, rating, settings-driven content
// ============================================================

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '@/components/providers'

export function Hero() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then(setSettings).catch(() => {})
  }, [])

  const avatarImages = (settings.hero_avatar_images ?? '')
    .split(',')
    .map((src) => src.trim())
    .filter(Boolean)

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            {t('hero_badge')}
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t('hero_title')}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('hero_sub')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {t('order_now')}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t('view_menu')}
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatarImages.length > 0
                ? avatarImages.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt="Customer"
                      width={36}
                      height={36}
                      className="size-9 rounded-full border-2 border-background object-cover"
                    />
                  ))
                : ['bg-accent', 'bg-primary', 'bg-chart-2', 'bg-chart-5'].map(
                    (c, i) => (
                      <span
                        key={i}
                        className={`size-9 rounded-full border-2 border-background ${c}`}
                      />
                    ),
                  )}
            </div>
            <div>
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {settings.hero_rating_text || '4.9 · 2,400+ happy deliveries'}
              </p>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-border shadow-2xl">
            <Image
              src={settings.hero_image || '/images/hero-tortelloni.png'}
              alt="Fresh tortelloni bowl"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-2 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <p className="font-heading text-sm font-semibold">
              {settings.hero_card_title || 'Fresh daily'}
            </p>
            <p className="text-xs text-muted-foreground">
              {settings.hero_card_subtitle || 'Made to order'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
