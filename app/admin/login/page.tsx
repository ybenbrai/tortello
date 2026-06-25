'use client'

// ============================================================
// Admin Login Page
// Password-based auth, stores session in cookie
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      setError('Invalid password')
      return
    }
    router.push('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Tortello Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your admin password</p>
        </div>
        {error && (
          <p className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <LogIn className="size-4" />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
