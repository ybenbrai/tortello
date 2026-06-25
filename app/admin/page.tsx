'use client'

// ============================================================
// Admin Dashboard
// Summary cards with entity counts from all API endpoints
// ============================================================

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pizza, Star, MessageSquareText, HelpCircle, Tag, Package } from 'lucide-react'

const cards = [
  { href: '/admin/products', label: 'Menu Items', icon: Pizza, desc: 'Fillings, styles, sauces & extras', color: 'bg-primary/10 text-primary' },
  { href: '/admin/featured', label: 'Featured Dishes', icon: Star, desc: 'Pre-built signature dishes', color: 'bg-accent/15 text-accent-foreground' },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareText, desc: 'Customer testimonials', color: 'bg-secondary/40 text-secondary-foreground' },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle, desc: 'Frequently asked questions', color: 'bg-muted-foreground/10 text-muted-foreground' },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag, desc: 'Discount codes & promotions', color: 'bg-primary/10 text-primary' },
  { href: '/admin/orders', label: 'Orders', icon: Package, desc: 'Incoming & past orders', color: 'bg-accent/15 text-accent-foreground' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/menu-items').then(r => r.json()).then(d => setCounts(c => ({ ...c, menu: d.length }))).catch(() => {}),
      fetch('/api/featured-dishes').then(r => r.json()).then(d => setCounts(c => ({ ...c, featured: d.length }))).catch(() => {}),
      fetch('/api/reviews').then(r => r.json()).then(d => setCounts(c => ({ ...c, reviews: d.length }))).catch(() => {}),
      fetch('/api/faqs').then(r => r.json()).then(d => setCounts(c => ({ ...c, faqs: d.length }))).catch(() => {}),
      fetch('/api/coupons').then(r => r.json()).then(d => setCounts(c => ({ ...c, coupons: d.length }))).catch(() => {}),
      fetch('/api/orders').then(r => r.json()).then(d => setCounts(c => ({ ...c, orders: d.length }))).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  const countMap: Record<string, number> = {
    '/admin/products': counts.menu ?? 0,
    '/admin/featured': counts.featured ?? 0,
    '/admin/reviews': counts.reviews ?? 0,
    '/admin/faqs': counts.faqs ?? 0,
    '/admin/coupons': counts.coupons ?? 0,
    '/admin/orders': counts.orders ?? 0,
  }

  return (
    <div>
      <p className="mb-6 text-sm text-muted-foreground">Welcome to the Tortello admin panel. Manage your content below.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? cards.map((card) => (
              <div key={card.href} className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-3 h-10 w-10 animate-pulse rounded-xl bg-muted" />
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                <div className="mt-1 h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-7 w-12 animate-pulse rounded bg-muted" />
              </div>
            ))
          : cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${card.color}`}>
                  <card.icon className="size-5" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{card.label}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{card.desc}</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{countMap[card.href]}</p>
              </Link>
            ))}
      </div>
    </div>
  )
}
