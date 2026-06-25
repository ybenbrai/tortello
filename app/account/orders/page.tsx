'use client'

// ============================================================
// Orders Page
// Lists all past orders fetched from API with reorder + track
// ============================================================

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { fetchOrders } from '@/lib/api'
import type { OrderRecord } from '@/lib/types'
import type { DictKey } from '@/lib/i18n'
import { formatPrice, cn } from '@/lib/utils'

const statusKey: Record<string, DictKey> = {
  preparing: 'status_preparing',
  'on-the-way': 'status_on_the_way',
  delivered: 'status_delivered',
}

export default function OrdersPage() {
  const { t, locale } = useLanguage()
  const { addItem, setOpen } = useCart()
  const cur = t('currency')
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  function reorder(order: OrderRecord) {
    order.items.forEach((item, i) => {
      addItem({
        id: `reorder-${order.id}-${i}`,
        filling: 'preset',
        style: 'preset',
        sauce: 'preset',
        extras: [],
        quantity: item.quantity,
        unitPrice: Math.round(order.total / order.items.length),
        label: item.label,
      })
    })
    setOpen(true)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-3xl bg-muted" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card py-16 text-center">
        <p className="text-muted-foreground">{t('orders_load_error')}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card py-16 text-center">
        <p className="text-muted-foreground">{t('no_orders')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-3xl border border-border bg-card p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-sm font-medium">{order.id}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {order.date}
              </p>
            </div>
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold',
                order.status === 'delivered'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-accent text-accent-foreground',
              )}
            >
              {t(statusKey[order.status])}
            </span>
          </div>

          <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="text-foreground/90">
                {item.label[locale]}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <span className="font-heading text-lg font-semibold">
              {formatPrice(order.total, cur)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => reorder(order)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <RotateCcw className="size-4" />
                {t('reorder')}
              </button>
              <Link
                href={`/track/${order.id}`}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {order.status === 'delivered' ? t('view_order') : t('track_order')}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
