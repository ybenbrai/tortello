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

export interface DeliveryArea {
  id: string
  name: Localized
  eta: string
  fee: number
  /* position in % on the map image */
  x: number
  y: number
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

export interface OrderRecord {
  id: string
  date: string
  total: number
  status: 'preparing' | 'on-the-way' | 'delivered'
  items: { label: Localized; quantity: number }[]
  city: Localized
}
