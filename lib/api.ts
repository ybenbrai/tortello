// ============================================================
// Client API Layer
// Typed fetch helpers that transform flat DB rows into
// component-friendly Localized object format
// ============================================================

import type { OptionItem, FeaturedDish, Review, Faq, Localized, OrderRecord, CouponInfo } from './types'

// ── Helpers ───────────────────────────────────

function loc(en: string, fr: string, ar: string): Localized {
  return { en, fr, ar }
}

// ── Row → Component type converters ───────────

interface MenuItemRow {
  id: string; type: string
  nameEn: string; nameFr: string; nameAr: string
  price: number; image: string | null
  descEn: string | null; descFr: string | null; descAr: string | null
}

function toOptionItem(r: MenuItemRow): OptionItem {
  return {
    id: r.id,
    name: loc(r.nameEn, r.nameFr, r.nameAr),
    price: r.price,
    image: r.image || undefined,
    desc: r.descEn ? loc(r.descEn, r.descFr!, r.descAr!) : undefined,
  }
}

interface FeaturedRow {
  id: string
  nameEn: string; nameFr: string; nameAr: string
  descEn: string; descFr: string; descAr: string
  price: number; image: string
  tagEn: string | null; tagFr: string | null; tagAr: string | null
}

function toFeatured(r: FeaturedRow): FeaturedDish {
  return {
    id: r.id,
    name: loc(r.nameEn, r.nameFr, r.nameAr),
    desc: loc(r.descEn, r.descFr, r.descAr),
    price: r.price,
    image: r.image,
    tag: r.tagEn ? loc(r.tagEn, r.tagFr!, r.tagAr!) : undefined,
  }
}

interface ReviewRow {
  id: string; name: string
  cityEn: string; cityFr: string; cityAr: string
  rating: number
  textEn: string; textFr: string; textAr: string
}

function toReview(r: ReviewRow): Review {
  return {
    id: r.id,
    name: r.name,
    city: loc(r.cityEn, r.cityFr, r.cityAr),
    rating: r.rating,
    text: loc(r.textEn, r.textFr, r.textAr),
  }
}

interface FaqRow {
  id: string
  qEn: string; qFr: string; qAr: string
  aEn: string; aFr: string; aAr: string
}

function toFaq(r: FaqRow): Faq {
  return {
    q: loc(r.qEn, r.qFr, r.qAr),
    a: loc(r.aEn, r.aFr, r.aAr),
  }
}

interface OrderItemRow {
  id: number; orderId: string
  filling: string; style: string; sauce: string
  extras: string
  quantity: number; unitPrice: number
  labelEn: string; labelFr: string; labelAr: string
}

interface OrderRow {
  id: string; date: string; total: number; status: string
  name: string; phone: string; address: string
  notes: string | null; payment: string
  coupon: string | null; discount: number | null
  items: OrderItemRow[]
}

function toOrderRecord(r: OrderRow): OrderRecord {
  return {
    id: r.id,
    date: r.date,
    total: r.total,
    address: r.address,
    status: r.status as OrderRecord['status'],
    items: r.items.map((i) => ({
      label: loc(i.labelEn, i.labelFr, i.labelAr),
      quantity: i.quantity,
    })),
  }
}

// ── HTTP helper ───────────────────────────────

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

// ── Public API fetchers ───────────────────────

export async function fetchMenuItems(type?: string): Promise<OptionItem[]> {
  const params = type ? `?type=${type}` : ''
  const rows: MenuItemRow[] = await get(`/api/menu-items${params}`)
  return rows.map(toOptionItem)
}

export async function fetchFillings(): Promise<OptionItem[]> {
  return fetchMenuItems('filling')
}

export async function fetchStyles(): Promise<OptionItem[]> {
  return fetchMenuItems('style')
}

export async function fetchSauces(): Promise<OptionItem[]> {
  return fetchMenuItems('sauce')
}

export async function fetchExtras(): Promise<OptionItem[]> {
  return fetchMenuItems('extra')
}

export async function fetchFeaturedDishes(): Promise<FeaturedDish[]> {
  const rows: FeaturedRow[] = await get('/api/featured-dishes')
  return rows.map(toFeatured)
}

export async function fetchReviews(): Promise<Review[]> {
  const rows: ReviewRow[] = await get('/api/reviews')
  return rows.map(toReview)
}

export async function fetchFaqs(): Promise<Faq[]> {
  const rows: FaqRow[] = await get('/api/faqs')
  return rows.map(toFaq)
}

export async function fetchCoupons(): Promise<CouponInfo[]> {
  const rows = await get<{ code: string; discount: number }[]>('/api/coupons')
  return rows.map((r) => ({ code: r.code, discount: r.discount }))
}

export async function fetchOrders(): Promise<OrderRecord[]> {
  const rows: OrderRow[] = await get('/api/orders')
  return rows.map(toOrderRecord)
}

export async function fetchOrder(id: string): Promise<OrderRecord | null> {
  try {
    const row: OrderRow = await get(`/api/orders/${id}`)
    return toOrderRecord(row)
  } catch {
    return null
  }
}
