'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Gift, Heart, MapPin, Receipt } from 'lucide-react'
import { useAuth, useCart, useLanguage } from '@/components/providers'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { points, favorites } = useCart()
  const [orderCount, setOrderCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((orders) => setOrderCount(orders.length))
      .catch(() => setOrderCount(0))
  }, [])

  const stats = [
    {
      href: '/account/orders',
      icon: Receipt,
      label: t('account_orders'),
      value: orderCount === null ? '—' : String(orderCount),
    },
    {
      href: '/account/favorites',
      icon: Heart,
      label: t('account_favorites'),
      value: String(favorites.length),
    },
    {
      href: '/account/loyalty',
      icon: Gift,
      label: t('account_loyalty'),
      value: points.toLocaleString(),
    },
  ]

  if (!user) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
        <span className="grid size-16 place-items-center rounded-full bg-primary font-heading text-2xl font-semibold text-primary-foreground">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="font-heading text-xl font-semibold">{user.name}</p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {user.phone}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <s.icon className="size-5" />
            </span>
            <p className="mt-4 font-heading text-3xl font-semibold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <form className="rounded-3xl border border-border bg-card p-6">
        <h2 className="font-heading text-xl font-semibold">
          {t('account_profile')}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <ProfileField label={t('name')} defaultValue={user.name} />
          <ProfileField label={t('phone')} defaultValue={user.phone} />
          <ProfileField label={t('email')} defaultValue={user.email} type="email" />
        </div>
        <button
          type="button"
          className={cn(
            'mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground',
          )}
        >
          {t('account_profile')}
        </button>
      </form>
    </div>
  )
}

function ProfileField({
  label,
  defaultValue,
  type = 'text',
}: {
  label: string
  defaultValue: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  )
}
