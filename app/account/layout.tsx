'use client'

import { AccountNav } from '@/components/account-nav'
import { useLanguage } from '@/components/providers'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
        {t('account_title')}
      </h1>
      <div className="mt-6">
        <AccountNav />
      </div>
      <div className="mt-8">{children}</div>
    </div>
  )
}
