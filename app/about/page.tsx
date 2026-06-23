'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, Sparkles, Target } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import type { DictKey } from '@/lib/i18n'

const values: { icon: typeof Target; t: DictKey; d: DictKey }[] = [
  { icon: Target, t: 'mission_t', d: 'mission_d' },
  { icon: Heart, t: 'values_t', d: 'values_d' },
  { icon: Leaf, t: 'quality_t', d: 'quality_d' },
  { icon: Sparkles, t: 'fresh_t', d: 'fresh_d' },
]

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="pb-20">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            {t('about_title')}
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {t('about_title')}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('about_lead')}
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {t('order_now')}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[2rem] border border-border shadow-2xl">
          <Image
            src="/images/about-kitchen.png"
            alt="Tortello kitchen preparing fresh pasta"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8 lg:mt-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.t}
              className="rounded-3xl border border-border bg-card p-7"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <v.icon className="size-7" />
              </div>
              <h2 className="mt-5 font-heading text-xl font-semibold">
                {t(v.t)}
              </h2>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {t(v.d)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
