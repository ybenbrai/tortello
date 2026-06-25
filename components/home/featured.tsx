'use client'

// ============================================================
// Featured Dishes Section
// Grid of preset tortelloni combinations fetched from API
// ============================================================

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { DishCard } from '@/components/dish-card'
import { fetchFeaturedDishes } from '@/lib/api'
import type { FeaturedDish } from '@/lib/types'

export function Featured() {
  const { t } = useLanguage()
  const [dishes, setDishes] = useState<FeaturedDish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedDishes()
      .then(setDishes)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="h-8 w-64 animate-pulse rounded-full bg-muted" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl bg-muted" />
          ))}
        </div>
      </section>
    )
  }

  if (dishes.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="text-balance font-heading text-3xl font-semibold sm:text-4xl">
            {t('featured_title')}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {t('featured_sub')}
          </p>
        </div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          {t('view_menu')}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
