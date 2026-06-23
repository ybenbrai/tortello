'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { MoroccoMap } from '@/components/morocco-map'
import { deliveryAreas } from '@/lib/data'
import { formatPrice, cn } from '@/lib/utils'

export function DeliveryPreview() {
  const { t, locale } = useLanguage()
  const [active, setActive] = useState<string>('casablanca')
  const cur = t('currency')

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <h2 className="text-balance font-heading text-3xl font-semibold sm:text-4xl">
            {t('delivery_title')}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {t('delivery_sub')}
          </p>
          <ul className="mt-8 space-y-3">
            {deliveryAreas.map((area) => {
              const isActive = active === area.id
              return (
                <li key={area.id}>
                  <button
                    type="button"
                    onClick={() => setActive(area.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors rtl:text-right',
                      isActive
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-card hover:bg-muted',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <MapPin
                        className={cn(
                          'size-5',
                          isActive ? 'text-accent' : 'text-muted-foreground',
                        )}
                      />
                      <span className="font-medium">{area.name[locale]}</span>
                    </span>
                    <span className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-4" />
                        {area.eta}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(area.fee, cur)}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <Link
            href="/delivery"
            className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            {t('nav_delivery')}
          </Link>
        </div>
        <div className="order-1 rounded-3xl border border-border bg-card p-6 lg:order-2">
          <MoroccoMap activeId={active} onSelect={setActive} />
        </div>
      </div>
    </section>
  )
}
