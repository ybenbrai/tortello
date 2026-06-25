'use client'

// ============================================================
// Menu Builder
// Step-by-step tortelloni customization with filling, style,
// sauce, extras selector and live summary
// ============================================================

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart, useLanguage } from '@/components/providers'
import {
  fetchFillings,
  fetchStyles,
  fetchSauces,
  fetchExtras,
} from '@/lib/api'
import type { DictKey } from '@/lib/i18n'
import type { Locale, Localized, OptionItem } from '@/lib/types'
import { formatPrice, cn } from '@/lib/utils'

function priceLabel(
  item: OptionItem,
  cur: string,
  includedLabel: string,
): string {
  return item.price === 0 ? includedLabel : `+ ${formatPrice(item.price, cur)}`
}

export function MenuBuilder() {
  const { t, locale, dir } = useLanguage()
  const { addItem } = useCart()
  const cur = t('currency')

  const [fillings, setFillings] = useState<OptionItem[]>([])
  const [cookingStyles, setCookingStyles] = useState<OptionItem[]>([])
  const [sauces, setSauces] = useState<OptionItem[]>([])
  const [extrasData, setExtrasData] = useState<OptionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [menuError, setMenuError] = useState(false)

  const [filling, setFilling] = useState('')
  const [style, setStyle] = useState('')
  const [sauce, setSauce] = useState('')
  const [chosenExtras, setChosenExtras] = useState<string[]>([])
  const [qty, setQty] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        const [f, st, sa, e] = await Promise.all([
          fetchFillings(),
          fetchStyles(),
          fetchSauces(),
          fetchExtras(),
        ])
        setFillings(f)
        setCookingStyles(st)
        setSauces(sa)
        setExtrasData(e)
        setFilling(f[0]?.id ?? '')
        setStyle(st[0]?.id ?? '')
        setSauce(sa[0]?.id ?? '')
      } catch {
        setMenuError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const selFilling = fillings.find((f) => f.id === filling)
  const selStyle = cookingStyles.find((s) => s.id === style)
  const selSauce = sauces.find((s) => s.id === sauce)

  const unitPrice = useMemo(() => {
    const extrasTotal = chosenExtras.reduce(
      (acc, id) => acc + (extrasData.find((e) => e.id === id)?.price ?? 0),
      0,
    )
    return (selFilling?.price ?? 0) + (selStyle?.price ?? 0) + (selSauce?.price ?? 0) + extrasTotal
  }, [selFilling, selStyle, selSauce, chosenExtras])

  function toggleExtra(id: string) {
    setChosenExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function buildLabel(): Localized {
    const join = (a: string, b: string, c: string) => `${a} · ${b} · ${c}`
    const out = {} as Localized
    ;(['en', 'fr', 'ar'] as Locale[]).forEach((l) => {
      out[l] = join(selFilling?.name[l] ?? '', selStyle?.name[l] ?? '', selSauce?.name[l] ?? '')
    })
    return out
  }

  function handleAdd() {
    addItem({
      id: `${filling}-${style}-${sauce}-${[...chosenExtras].sort().join('-')}`,
      filling,
      style,
      sauce,
      extras: chosenExtras,
      quantity: qty,
      unitPrice,
      label: buildLabel(),
    })
    setQty(1)
  }

  if (menuError) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Failed to load menu. Please try again later.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="size-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance font-heading text-4xl font-semibold sm:text-5xl">
          {t('menu_title')}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">
          {t('menu_sub')}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <Step
            index={1}
            titleKey="step_filling"
            options={fillings}
            selected={[filling]}
            onSelect={(id) => setFilling(id)}
            locale={locale}
            cur={cur}
            includedLabel={t('included')}
            withImages
          />
          <Step
            index={2}
            titleKey="step_style"
            options={cookingStyles}
            selected={[style]}
            onSelect={(id) => setStyle(id)}
            locale={locale}
            cur={cur}
            includedLabel={t('included')}
          />
          <Step
            index={3}
            titleKey="step_sauce"
            options={sauces}
            selected={[sauce]}
            onSelect={(id) => setSauce(id)}
            locale={locale}
            cur={cur}
            includedLabel={t('included')}
          />
          <Step
            index={4}
            titleKey="step_extras"
            options={extrasData}
            selected={chosenExtras}
            onSelect={toggleExtra}
            multi
            locale={locale}
            cur={cur}
            includedLabel={t('included')}
          />
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:h-fit" dir={dir}>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative aspect-[4/3]">
              <Image
                src={selFilling?.image || '/placeholder.svg'}
                alt={selFilling?.name?.[locale] ?? ''}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-heading text-lg font-semibold">
                {t('your_selection')}
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <SummaryRow label={t('step_filling')} value={selFilling?.name?.[locale] ?? ''} />
                <SummaryRow label={t('step_style')} value={selStyle?.name?.[locale] ?? ''} />
                <SummaryRow label={t('step_sauce')} value={selSauce?.name?.[locale] ?? ''} />
                <SummaryRow
                  label={t('step_extras')}
                  value={
                    chosenExtras.length
                      ? chosenExtras
                          .map(
                            (id) =>
                              extrasData.find((e) => e.id === id)?.name[locale],
                          )
                          .join(', ')
                      : '—'
                  }
                />
              </dl>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t('quantity')}
                </span>
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid size-9 place-items-center rounded-full hover:bg-muted"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => q + 1)}
                    className="grid size-9 place-items-center rounded-full hover:bg-muted"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">{t('total')}</span>
                <span className="font-heading text-2xl font-semibold">
                  {formatPrice(unitPrice * qty, cur)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShoppingBag className="size-4" />
                {t('add_to_cart')}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium rtl:text-left">{value}</dd>
    </div>
  )
}

function Step({
  index,
  titleKey,
  options,
  selected,
  onSelect,
  multi = false,
  withImages = false,
  locale,
  cur,
  includedLabel,
}: {
  index: number
  titleKey: DictKey
  options: OptionItem[]
  selected: string[]
  onSelect: (id: string) => void
  multi?: boolean
  withImages?: boolean
  locale: Locale
  cur: string
  includedLabel: string
}) {
  const { t } = useLanguage()
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {index}
        </span>
        <h2 className="font-heading text-2xl font-semibold">{t(titleKey)}</h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {options.map((opt) => {
          const isSel = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-pressed={isSel}
              className={cn(
                'group relative flex items-center gap-4 rounded-2xl border p-4 text-left transition-all rtl:text-right',
                isSel
                  ? 'border-accent bg-accent/10 ring-1 ring-accent'
                  : 'border-border bg-card hover:border-foreground/20',
              )}
            >
              {withImages && opt.image && (
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={opt.image || '/placeholder.svg'}
                    alt={opt.name[locale]}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="flex-1">
                <span className="block font-heading font-semibold">
                  {opt.name[locale]}
                </span>
                {opt.desc && (
                  <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                    {opt.desc[locale]}
                  </span>
                )}
                <span
                  className={cn(
                    'mt-1 block text-sm font-medium',
                    opt.price === 0 ? 'text-muted-foreground' : 'text-accent',
                  )}
                >
                  {priceLabel(opt, cur, includedLabel)}
                </span>
              </span>
              <span
                className={cn(
                  'grid size-6 shrink-0 place-items-center rounded-full border transition-colors',
                  isSel
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border',
                  multi ? 'rounded-md' : 'rounded-full',
                )}
              >
                {isSel && <Check className="size-3.5" />}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
