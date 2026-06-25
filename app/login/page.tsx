'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/components/providers'
import { useLanguage } from '@/components/providers'
import { FormField } from '@/components/form-field'

export default function LoginPage() {
  const { t } = useLanguage()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const err = await login(form.get('email') as string, form.get('password') as string)
    setLoading(false)
    if (err) setError(err)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{t('login_title')}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t('login_sub')}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>}
        <FormField label={t('email')} name="email" type="email" />
        <FormField label={t('password')} name="password" type="password" />
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <LogIn className="size-4" />}
          {t('login')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t('no_account')}{' '}
        <Link href="/register" className="font-semibold text-accent hover:underline">{t('register')}</Link>
      </p>
    </div>
  )
}
