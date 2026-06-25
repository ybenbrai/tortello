'use client'

import { useLanguage } from '@/components/providers'
import type { DictKey } from '@/lib/i18n'
import type { Localized } from '@/lib/types'

export interface LegalSection {
  heading: Localized
  body: Localized
}

export function LegalPage({
  titleKey,
  sections,
}: {
  titleKey: DictKey
  sections: LegalSection[]
}) {
  const { t, locale } = useLanguage()
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
        {t(titleKey)}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('last_updated')}
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-heading text-xl font-semibold">
              {section.heading[locale]}
            </h2>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              {section.body[locale]}
            </p>
          </section>
        ))}
      </div>
    </article>
  )
}
