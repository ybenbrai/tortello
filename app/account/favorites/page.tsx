'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import { DishCard } from '@/components/dish-card'
import { featuredDishes } from '@/lib/data'

export default function FavoritesPage() {
  const { t } = useLanguage()
  const { favorites } = useCart()

  const favDishes = featuredDishes.filter((d) => favorites.includes(d.id))

  if (favDishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-card py-20 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-muted">
          <Heart className="size-7 text-muted-foreground" />
        </div>
        <p className="max-w-xs text-pretty text-muted-foreground">
          {t('no_favorites')}
        </p>
        <Link
          href="/menu"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t('view_menu')}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favDishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  )
}
