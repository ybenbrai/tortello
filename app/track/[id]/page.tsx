'use client'

// ============================================================
// Track Order Page
// Real-time order status tracker with stage progress (received →
// preparing → on-the-way → delivered)
// ============================================================

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { use } from 'react'
import {
  Bike,
  Check,
  ChefHat,
  Clock,
  MapPin,
  PackageCheck,
  ReceiptText,
} from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { fetchOrder } from '@/lib/api'
import type { OrderRecord } from '@/lib/types'
import type { DictKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const stageOrder = ['received', 'preparing', 'on-the-way', 'delivered'] as const
type Stage = (typeof stageOrder)[number]

const stages: { id: Stage; icon: typeof ChefHat; label: DictKey }[] = [
  { id: 'received', icon: ReceiptText, label: 'order_received' },
  { id: 'preparing', icon: ChefHat, label: 'status_preparing' },
  { id: 'on-the-way', icon: Bike, label: 'status_on_the_way' },
  { id: 'delivered', icon: PackageCheck, label: 'status_delivered' },
]

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { t, locale } = useLanguage()
  const [order, setOrder] = useState<OrderRecord | null | 'loading'>('loading')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchOrder(id)
      .then((o) => setOrder(o ?? null))
      .catch(() => setError(true))
  }, [id])

  if (order === 'loading') {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/account/orders"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {t('account_orders')}
        </Link>
        <div className="mt-8 flex min-h-[40vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="text-muted-foreground">{t('order_not_found')}</p>
        <Link
          href="/account/orders"
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t('account_orders')}
        </Link>
      </div>
    )
  }

  const currentIndex = stageOrder.indexOf(order.status)

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <Link
        href="/account/orders"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← {t('account_orders')}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
          {t('track_order')}
        </h1>
        <span className="rounded-full bg-secondary px-4 py-2 font-mono text-sm font-medium text-secondary-foreground">
          {id}
        </span>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <ol className="relative">
          {stages.map((stage, i) => {
            const done = i < currentIndex
            const active = i === currentIndex
            const last = i === stages.length - 1
            return (
              <li key={stage.id} className="flex gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <span
                    className={cn(
                      'z-10 grid size-11 place-items-center rounded-full border-2 transition-colors',
                      done || active
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    {done ? (
                      <Check className="size-5" />
                    ) : (
                      <stage.icon className="size-5" />
                    )}
                  </span>
                  {!last && (
                    <span
                      className={cn(
                        'absolute top-11 h-full w-0.5',
                        done ? 'bg-accent' : 'bg-border',
                      )}
                    />
                  )}
                </div>
                <div className="pt-1.5">
                  <p
                    className={cn(
                      'font-heading font-semibold',
                      active && 'text-accent',
                    )}
                  >
                    {t(stage.label)}
                  </p>
                  {active && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="size-3.5" />
                      {t('est_delivery')}: 25-35 min
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {order && (
        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-accent" />
            {order.address}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.label[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
