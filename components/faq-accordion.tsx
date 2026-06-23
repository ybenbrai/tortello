'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { faqs } from '@/lib/data'
import { cn } from '@/lib/utils'

export function FaqAccordion({ withHeading = true }: { withHeading?: boolean }) {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {withHeading && (
        <h2 className="text-balance text-center font-heading text-3xl font-semibold sm:text-4xl">
          {t('faq_title')}
        </h2>
      )}
      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left rtl:text-right"
              >
                <span className="font-heading text-base font-semibold">
                  {faq.q[locale]}
                </span>
                <Plus
                  className={cn(
                    'size-5 shrink-0 text-accent transition-transform duration-300',
                    isOpen && 'rotate-45',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300',
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-pretty leading-relaxed text-muted-foreground">
                    {faq.a[locale]}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
