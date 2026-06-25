'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AccountNav } from '@/components/account-nav'
import { useAuth, useLanguage } from '@/components/providers'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useLanguage()
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  if (loading || !user) return null

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
