'use client'

// ============================================================
// Admin Settings
// Manage homepage hero content: image, text, avatars
// ============================================================

import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

const fields = [
  { key: 'hero_image', label: 'Hero Image Path', hint: 'e.g. /images/hero-tortelloni.png' },
  { key: 'hero_card_title', label: 'Hero Card Title', hint: 'e.g. Fresh daily' },
  { key: 'hero_card_subtitle', label: 'Hero Card Subtitle', hint: 'e.g. Made to order' },
  { key: 'hero_rating_text', label: 'Hero Rating Text', hint: 'e.g. 4.9 · 2,400+ happy deliveries' },
  { key: 'hero_avatar_images', label: 'Avatar Images (comma-separated paths)', hint: 'e.g. /images/avatar-1.svg,/images/avatar-2.svg,/images/avatar-3.svg,/images/avatar-4.svg' },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)

  function load() {
    setLoading(true)
    setError(false)
    fetch('/api/settings').then((r) => r.json()).then(setSettings).catch(() => setError(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    setSaveError(false)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setSaveError(true)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg">
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="mb-1 h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-11 animate-pulse rounded-xl bg-muted" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-destructive">Failed to load settings.</p>
  }

  return (
    <div className="max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage homepage text and images.</p>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
      {saveError && <p className="mb-4 text-sm text-destructive">Failed to save settings.</p>}
      <div className="space-y-4">
        {fields.map((f) => (
          <label key={f.key}>
            <span className="mb-1 block text-sm font-medium text-foreground">{f.label}</span>
            <input
              value={settings[f.key] ?? ''}
              onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
              placeholder={f.hint}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
