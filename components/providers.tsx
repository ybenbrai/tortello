'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { CartItem, Locale } from '@/lib/types'
import { translate, type DictKey, LOCALES } from '@/lib/i18n'
import {
  DELIVERY_FEE_DEFAULT,
  FREE_DELIVERY_THRESHOLD,
} from '@/lib/data'

/* ---------------- Language ---------------- */

interface LanguageCtx {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: DictKey) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageCtx | null>(null)

/* ---------------- Theme ---------------- */

interface ThemeCtx {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeCtx | null>(null)

/* ---------------- Cart ---------------- */

interface CartCtx {
  items: CartItem[]
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
  deliveryFee: number
  total: number
  favorites: string[]
  toggleFavorite: (id: string) => void
  points: number
}

const CartContext = createContext<CartCtx | null>(null)

export function AppProviders({ children }: { children: React.ReactNode }) {
  /* language */
  const [locale, setLocaleState] = useState<Locale>('en')
  /* theme */
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  /* cart */
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  /* hydrate from localStorage */
  useEffect(() => {
    try {
      const l = localStorage.getItem('tortello.locale') as Locale | null
      if (l) setLocaleState(l)
      const th = localStorage.getItem('tortello.theme') as
        | 'light'
        | 'dark'
        | null
      const prefersDark =
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
      setTheme(th ?? (prefersDark ? 'dark' : 'light'))
      const c = localStorage.getItem('tortello.cart')
      if (c) setItems(JSON.parse(c))
      const f = localStorage.getItem('tortello.favorites')
      if (f) setFavorites(JSON.parse(f))
    } catch {
      /* ignore */
    }
  }, [])

  /* apply theme + dir */
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('tortello.theme', theme)
  }, [theme])

  useEffect(() => {
    const meta = LOCALES.find((x) => x.code === locale)
    const root = document.documentElement
    root.lang = locale
    root.dir = meta?.dir ?? 'ltr'
    localStorage.setItem('tortello.locale', locale)
  }, [locale])

  useEffect(() => {
    localStorage.setItem('tortello.cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem('tortello.favorites', JSON.stringify(favorites))
  }, [favorites])

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])
  const t = useCallback((key: DictKey) => translate(key, locale), [locale])
  const dir = LOCALES.find((x) => x.code === locale)?.dir ?? 'ltr'

  const toggleTheme = useCallback(
    () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')),
    [],
  )

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p,
        )
      }
      return [...prev, item]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((p) => p.id !== id)),
    [],
  )

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, qty) } : p))
        .filter((p) => p.quantity > 0),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
    [items],
  )
  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items],
  )
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE_DEFAULT
  const total = subtotal + deliveryFee
  const points = 1240

  const languageValue = useMemo(
    () => ({ locale, setLocale, t, dir }),
    [locale, setLocale, t, dir],
  )
  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  const cartValue = useMemo(
    () => ({
      items,
      isOpen,
      setOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      deliveryFee,
      total,
      favorites,
      toggleFavorite,
      points,
    }),
    [
      items,
      isOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      deliveryFee,
      total,
      favorites,
      toggleFavorite,
    ],
  )

  return (
    <LanguageContext.Provider value={languageValue}>
      <ThemeContext.Provider value={themeValue}>
        <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within AppProviders')
  return ctx
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within AppProviders')
  return ctx
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within AppProviders')
  return ctx
}
