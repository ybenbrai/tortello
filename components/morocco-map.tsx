'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/providers'
import { deliveryAreas } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MoroccoMap({
  activeId,
  onSelect,
}: {
  activeId?: string | null
  onSelect?: (id: string) => void
}) {
  const { locale } = useLanguage()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <Image
        src="/images/morocco-map.png"
        alt="Map of Morocco delivery zones"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain opacity-90 dark:opacity-80 dark:invert-[0.08]"
      />
      {deliveryAreas.map((area) => {
        const active = activeId === area.id
        return (
          <button
            key={area.id}
            type="button"
            onClick={() => onSelect?.(area.id)}
            style={{ left: `${area.x}%`, top: `${area.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            aria-label={area.name[locale]}
            aria-pressed={active}
          >
            <span className="relative flex size-3.5 items-center justify-center">
              <span
                className={cn(
                  'absolute inline-flex size-full animate-ping rounded-full opacity-60',
                  active ? 'bg-accent' : 'bg-primary',
                )}
              />
              <span
                className={cn(
                  'relative inline-flex size-3.5 rounded-full ring-2 ring-background',
                  active ? 'bg-accent' : 'bg-primary',
                )}
              />
            </span>
            <span
              className={cn(
                'absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium shadow-sm transition-colors',
                active
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card text-card-foreground',
              )}
            >
              {area.name[locale]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
