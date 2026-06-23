'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BadgePercent,
  CheckCircle2,
  CreditCard,
  Banknote,
  ShoppingBag,
  Tag,
} from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { COUPONS, deliveryAreas } from '@/lib/data'
import { formatPrice, cn } from '@/lib/utils'

export default function CheckoutPage() {
  const { t, locale, dir } = useLanguage()
  const { items, subtotal, deliveryFee, total, clear } = useCart()
  const cur = t('currency')

  const [coupon, setCoupon] = useState('')
  const [appliedRate, setAppliedRate] = useState(0)
  const [couponMsg, setCouponMsg] = useState<'ok' | 'invalid' | null>(null)
  const [payment, setPayment] = useState<'cod' | 'card'>('cod')
  const [placed, setPlaced] = useState(false)
  const [orderId] = useState(
    () => `TRT-${Math.floor(10000 + Math.random() * 89999)}`,
  )

  const discount = subtotal * appliedRate
  const grandTotal = Math.max(0, total - discount)

  function applyCoupon() {
    const rate = COUPONS[coupon.trim().toUpperCase()]
    if (rate) {
      setAppliedRate(rate)
      setCouponMsg('ok')
    } else {
      setAppliedRate(0)
      setCouponMsg('invalid')
    }
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    setPlaced(true)
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="size-16 text-accent" />
        <h1 className="mt-6 font-heading text-3xl font-semibold sm:text-4xl">
          {t('order_placed')}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          {t('order_placed_d')}
        </p>
        <p className="mt-4 rounded-full bg-secondary px-4 py-2 font-mono text-sm font-medium text-secondary-foreground">
          {orderId}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/track/${orderId}`}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t('track_order')}
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            {t('continue_shopping')}
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="grid size-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <p className="mt-5 text-muted-foreground">{t('cart_empty')}</p>
        <Link
          href="/menu"
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t('continue_shopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
        {t('checkout_title')}
      </h1>

      <form
        onSubmit={placeOrder}
        className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          {/* Delivery details */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold">
              {t('delivery_details')}
            </h2>
            <div className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t('name')} name="name" />
                <Field label={t('phone')} name="phone" type="tel" />
              </div>
              <Field label={t('address')} name="address" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                    {t('city')}
                  </label>
                  <select
                    id="city"
                    name="city"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  >
                    {deliveryAreas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name[locale]}
                      </option>
                    ))}
                  </select>
                </div>
                <Field label={t('notes')} name="notes" required={false} />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold">
              {t('payment')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <PaymentOption
                active={payment === 'cod'}
                onClick={() => setPayment('cod')}
                Icon={Banknote}
                label={t('cod')}
              />
              <PaymentOption
                active={payment === 'card'}
                onClick={() => setPayment('card')}
                Icon={CreditCard}
                label={t('card')}
              />
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-20 lg:h-fit" dir={dir}>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold">
              {t('order_summary')}
            </h2>

            <ul className="mt-5 space-y-3 border-b border-border pb-5">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="flex-1">
                    <span className="font-medium">{item.label[locale]}</span>
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.unitPrice * item.quantity, cur)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Coupon */}
            <div className="border-b border-border py-5">
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Tag className="size-4 text-accent" />
                {t('coupon')}
              </label>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="TORTELLO10"
                  className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm uppercase outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="shrink-0 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  {t('apply')}
                </button>
              </div>
              {couponMsg && (
                <p
                  className={cn(
                    'mt-2 flex items-center gap-1.5 text-xs font-medium',
                    couponMsg === 'ok' ? 'text-accent' : 'text-destructive',
                  )}
                >
                  <BadgePercent className="size-3.5" />
                  {couponMsg === 'ok'
                    ? `${t('coupon_applied')} · -${Math.round(appliedRate * 100)}%`
                    : t('coupon_invalid')}
                </p>
              )}
            </div>

            <div className="space-y-2 py-5 text-sm">
              <Row label={t('subtotal')} value={formatPrice(subtotal, cur)} />
              <Row
                label={t('delivery_fee')}
                value={deliveryFee === 0 ? t('free') : formatPrice(deliveryFee, cur)}
              />
              {discount > 0 && (
                <Row
                  label={t('discount')}
                  value={`- ${formatPrice(discount, cur)}`}
                  accent
                />
              )}
            </div>

            <div className="flex justify-between border-t border-border pt-4 font-heading text-lg font-semibold">
              <span>{t('total')}</span>
              <span>{formatPrice(grandTotal, cur)}</span>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t('place_order')}
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = true,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  )
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('font-medium', accent && 'text-accent')}>{value}</span>
    </div>
  )
}

function PaymentOption({
  active,
  onClick,
  Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  Icon: typeof CreditCard
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-3 rounded-2xl border p-4 text-left transition-all rtl:text-right',
        active
          ? 'border-accent bg-accent/10 ring-1 ring-accent'
          : 'border-border bg-background hover:border-foreground/20',
      )}
    >
      <Icon className={cn('size-5', active ? 'text-accent' : 'text-muted-foreground')} />
      <span className="font-medium">{label}</span>
    </button>
  )
}
