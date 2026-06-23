'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { DishCard } from '@/components/dish-card'
import { featuredDishes } from '@/lib/data'

export function Featured() {
  const { t } = useLanguage()
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
        {featuredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
