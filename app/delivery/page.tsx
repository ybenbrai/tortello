'use client'

import { useState } from 'react'
import { Clock, MapPin, Truck } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { MoroccoMap } from '@/components/morocco-map'
import { deliveryAreas } from '@/lib/data'
import { formatPrice, cn } from '@/lib/utils'

export default function DeliveryPage() {
  const { t, locale } = useLanguage()
  const [active, setActive] = useState<string>('casablanca')
  const cur = t('currency')
  const activeArea = deliveryAreas.find((a) => a.id === active)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Truck className="size-3.5 text-accent" />
          {t('delivery_title')}
        </span>
        <h1 className="mt-5 text-balance font-heading text-4xl font-semibold sm:text-5xl">
          {t('delivery_title')}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">
          {t('delivery_sub')}
        </p>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <MoroccoMap activeId={active} onSelect={setActive} />
        </div>

        <div>
          <ul className="space-y-3">
            {deliveryAreas.map((area) => {
              const isActive = active === area.id
              return (
                <li key={area.id}>
                  <button
                    type="button"
                    onClick={() => setActive(area.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-colors rtl:text-right',
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
                      <span className="font-heading font-semibold">
                        {area.name[locale]}
                      </span>
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

          {activeArea && (
            <div className="mt-6 rounded-3xl border border-border bg-primary p-6 text-primary-foreground">
              <h2 className="font-heading text-xl font-semibold">
                {activeArea.name[locale]}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    {t('est_delivery')}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-semibold">
                    {activeArea.eta}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    {t('delivery_fee')}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-semibold">
                    {formatPrice(activeArea.fee, cur)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
