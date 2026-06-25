'use client'

// ============================================================
// How It Works Section
// Three-step explainer: build → cook → deliver
// ============================================================

import { ChefHat, Soup, Truck } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import type { DictKey } from '@/lib/i18n'

const steps: { icon: typeof Soup; t: DictKey; d: DictKey }[] = [
  { icon: Soup, t: 'how_1_t', d: 'how_1_d' },
  { icon: ChefHat, t: 'how_2_t', d: 'how_2_d' },
  { icon: Truck, t: 'how_3_t', d: 'how_3_d' },
]

export function HowItWorks() {
  const { t } = useLanguage()
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-semibold sm:text-4xl">
            {t('how_title')}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-3xl border border-border bg-background p-7"
            >
              <span className="absolute right-6 top-6 font-heading text-5xl font-semibold text-muted/60">
                0{i + 1}
              </span>
              <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <s.icon className="size-7" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold">
                {t(s.t)}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {t(s.d)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
