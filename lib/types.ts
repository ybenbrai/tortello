// ============================================================
// Types & Interfaces
// Core type definitions shared across the app
// ============================================================

export type Locale = 'en' | 'fr' | 'ar'

export type Localized = Record<Locale, string>

export interface OptionItem {
  id: string
  name: Localized
  price: number
  image?: string
  desc?: Localized
}

export interface FeaturedDish {
  id: string
  name: Localized
  desc: Localized
  price: number
  image: string
  tag?: Localized
}

export interface Review {
  id: string
  name: string
  city: Localized
  rating: number
  text: Localized
}

export interface Faq {
  q: Localized
  a: Localized
}

export interface CartItem {
  id: string
  filling: string
  style: string
  sauce: string
  extras: string[]
  quantity: number
  unitPrice: number
  label: Localized
}

export interface CouponInfo {
  code: string
  discount: number
}

export interface UserInfo {
  id: string
  name: string
  email: string
  phone: string
}

export interface OrderRecord {
  id: string
  date: string
  total: number
  status: 'preparing' | 'on-the-way' | 'delivered'
  items: { label: Localized; quantity: number }[]
  address: string
}
