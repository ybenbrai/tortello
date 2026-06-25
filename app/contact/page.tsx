'use client'

// ============================================================
// Contact Page
// Contact form + WhatsApp chat CTA
// ============================================================

import { useState } from 'react'
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { useLanguage } from '@/components/providers'
import { FormField } from '@/components/form-field'
import { SOCIAL_LINKS, ContactLine } from '@/lib/contact'

export default function ContactPage() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance font-heading text-4xl font-semibold sm:text-5xl">
          {t('contact_title')}
        </h1>
        <p className="mt-3 text-pretty text-lg text-muted-foreground">
          {t('contact_sub')}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <CheckCircle2 className="size-14 text-accent" />
              <p className="max-w-sm text-pretty text-lg text-muted-foreground">
                {t('message_sent')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <FormField label={t('name')} name="name" />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label={t('phone')} name="phone" type="tel" />
                <FormField label={t('email')} name="email" type="email" />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t('send_message')}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-3xl bg-primary px-6 py-5 text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-6 text-accent" />
            <span className="font-heading text-lg font-semibold">
              {t('chat_whatsapp')}
            </span>
          </a>

          <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
            <ContactLine Icon={Phone} value="+212 6 00 00 00 00" />
            <ContactLine Icon={Mail} value="hello@tortello.ma" />
            <ContactLine
              Icon={MapPin}
              value="Casablanca · Rabat · Marrakech · Tangier · Agadir"
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t('nav_contact')}
            </p>
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


