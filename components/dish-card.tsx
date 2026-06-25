'use client'

// ============================================================
// Dish Card
// Featured dish card with image, description, price, add-to-cart
// ============================================================

import Image from 'next/image'
import { Heart, Plus } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { formatPrice, cn } from '@/lib/utils'
import type { FeaturedDish } from '@/lib/types'

export function DishCard({ dish }: { dish: FeaturedDish }) {
  const { t, locale } = useLanguage()
  const { addItem, favorites, toggleFavorite } = useCart()
  const isFav = favorites.includes(dish.id)
  const cur = t('currency')

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image || '/placeholder.svg'}
          alt={dish.name[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {dish.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {dish.tag[locale]}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(dish.id)}
          aria-label="Favorite"
          aria-pressed={isFav}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn(
              'size-4',
              isFav ? 'fill-destructive text-destructive' : 'text-foreground',
            )}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold">
          {dish.name[locale]}
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
          {dish.desc[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-xl font-semibold text-foreground">
            {formatPrice(dish.price, cur)}
          </span>
          <button
            type="button"
            onClick={() =>
              addItem({
                id: `preset-${dish.id}`,
                filling: 'preset',
                style: 'preset',
                sauce: 'preset',
                extras: [],
                quantity: 1,
                unitPrice: dish.price,
                label: dish.name,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            <Plus className="size-4" />
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </article>
  )
}
