'use client'

// ============================================================
// Reviews Section
// Customer testimonials fetched from API with star ratings
// ============================================================

import { useEffect, useState } from 'react'
import { Quote, Star } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { fetchReviews } from '@/lib/api'
import type { Review } from '@/lib/types'

export function Reviews() {
  const { t, locale } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-full bg-muted" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-3xl bg-muted" />
          ))}
        </div>
      </section>
    )
  }

  if (reviews.length === 0) return null

  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl font-semibold sm:text-4xl">
            {t('reviews_title')}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="rounded-3xl bg-primary-foreground/5 p-7 ring-1 ring-primary-foreground/10"
            >
              <Quote className="size-7 text-accent" />
              <div className="mt-4 flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty leading-relaxed text-primary-foreground/90">
                {r.text[locale]}
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-primary-foreground/60">
                  {' '}
                  · {r.city[locale]}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
