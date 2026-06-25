'use client'

// ============================================================
// Cart Drawer
// Slide-over cart panel with items, totals, and checkout CTA
// ============================================================

import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { formatPrice, cn } from '@/lib/utils'
import { FREE_DELIVERY_THRESHOLD } from '@/lib/data'

export function CartDrawer() {
  const { t, locale, dir } = useLanguage()
  const {
    items,
    isOpen,
    setOpen,
    removeItem,
    updateQty,
    subtotal,
    deliveryFee,
    total,
  } = useCart()

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  const cur = t('currency')

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        dir={dir}
        role="dialog"
        aria-label={t('your_cart')}
        className={cn(
          'fixed inset-y-0 z-[70] flex w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl transition-transform duration-300 ltr:right-0 rtl:left-0',
          isOpen
            ? 'translate-x-0'
            : 'ltr:translate-x-full rtl:-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
            <ShoppingBag className="size-5 text-accent" />
            {t('your_cart')}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t('cart_empty')}</p>
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              {t('continue_shopping')}
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {remaining > 0
                  ? `${formatPrice(remaining, cur)} ${t('free_delivery_progress')}`
                  : t('free_delivery_unlocked')}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="flex-1">
                      <p className="font-medium leading-snug">
                        {item.label[locale]}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {formatPrice(item.unitPrice, cur)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="grid size-8 place-items-center rounded-full hover:bg-muted"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="grid size-8 place-items-center rounded-full hover:bg-muted"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={t('remove')}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                    <p className="font-heading font-semibold">
                      {formatPrice(item.unitPrice * item.quantity, cur)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span>{formatPrice(subtotal, cur)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t('delivery_fee')}
                  </span>
                  <span>
                    {deliveryFee === 0 ? t('free') : formatPrice(deliveryFee, cur)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-heading text-base font-semibold">
                  <span>{t('total')}</span>
                  <span>{formatPrice(total, cur)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t('checkout')}
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
