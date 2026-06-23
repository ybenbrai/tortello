'use client'

import { Gift, Sparkles, Star } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

const rewards = [
  { cost: 500, en: 'Free Extra (Parmesan)', fr: 'Extra Gratuit (Parmesan)', ar: 'إضافة مجانية (بارميزان)' },
  { cost: 1000, en: 'Free Delivery x3', fr: 'Livraison Gratuite x3', ar: 'توصيل مجاني x3' },
  { cost: 1500, en: 'Free Classic Cheese Bowl', fr: 'Bol Fromage Offert', ar: 'طبق جبن مجاني' },
  { cost: 2500, en: 'Free Truffle Signature', fr: 'Signature Truffe Offerte', ar: 'توقيع الكمأة مجاناً' },
]

export default function LoyaltyPage() {
  const { t, locale } = useLanguage()
  const { points } = useCart()

  const nextReward = rewards.find((r) => r.cost > points) ?? rewards[rewards.length - 1]
  const progress = Math.min(100, (points / nextReward.cost) * 100)

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
          <Star className="size-4 text-accent" />
          {t('points_balance')}
        </div>
        <p className="mt-2 font-heading text-5xl font-semibold">
          {points.toLocaleString()}
        </p>
        <p className="mt-2 max-w-sm text-sm text-primary-foreground/70">
          {t('points_hint')}
        </p>

        <div className="mt-6">
          <div className="h-2.5 overflow-hidden rounded-full bg-primary-foreground/15">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-primary-foreground/70">
            {points} / {nextReward.cost} · {nextReward[locale]}
          </p>
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 font-heading text-xl font-semibold">
          <Gift className="size-5 text-accent" />
          {t('redeem')}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {rewards.map((reward) => {
            const canRedeem = points >= reward.cost
            return (
              <div
                key={reward.cost}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div>
                  <p className="font-heading font-semibold">{reward[locale]}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-accent">
                    <Sparkles className="size-3.5" />
                    {reward.cost.toLocaleString()} pts
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canRedeem}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    canRedeem
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'cursor-not-allowed bg-muted text-muted-foreground',
                  )}
                >
                  {t('redeem')}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
