'use client'

// ============================================================
// Admin Coupons
// CRUD for discount codes
// ============================================================

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Coupon {
  code: string
  discount: number
  active: boolean
  maxUses: number
  usedCount: number
}

type Feedback = { type: 'success' | 'error'; message: string } | null

let feedbackTimeout: ReturnType<typeof setTimeout>

function showFeedback(
  setter: (f: Feedback) => void,
  feedback: NonNullable<Feedback>,
) {
  clearTimeout(feedbackTimeout)
  setter(feedback)
  feedbackTimeout = setTimeout(() => setter(null), 2000)
}

export default function AdminCouponsPage() {
  const [items, setItems] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [edit, setEdit] = useState<Partial<Coupon> | null>(null)

  function load() {
    setLoading(true)
    setError(false)
    fetch('/api/coupons').then((r) => r.json()).then(setItems).catch(() => setError(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!edit) return
    const body = { ...edit }
    const res = edit.code
      ? await fetch(`/api/coupons/${edit.code}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/coupons', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setEdit(null); load(); showFeedback(setFeedback, { type: 'success', message: 'Saved!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Save failed' }) }
  }

  async function remove(code: string) {
    if (!confirm('Delete this coupon?')) return
    const res = await fetch(`/api/coupons/${code}`, { method: 'DELETE' })
    if (res.ok) { load(); showFeedback(setFeedback, { type: 'success', message: 'Deleted!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Delete failed' }) }
  }

  return (
    <div>
      {feedback && (
        <p className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${feedback.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
          {feedback.message}
        </p>
      )}
      <div className="mb-4 flex justify-end">
        <button onClick={() => setEdit({ code: '', discount: 0.1, active: true, maxUses: 0, usedCount: 0 })} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="size-4" /> Add Coupon</button>
      </div>
      {loading ? (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Discount</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Active</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Uses</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Max</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-t border-border">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <td key={j} className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded bg-muted" /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : error ? (
        <p className="py-10 text-center text-sm text-destructive">Failed to load coupons.</p>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No coupons yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Code</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Discount</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Active</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Uses</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Max</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.code} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{c.code}</td>
                  <td className="px-4 py-3 text-foreground">{Math.round(c.discount * 100)}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.active ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{c.usedCount}</td>
                  <td className="px-4 py-3 text-foreground">{c.maxUses || '∞'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setEdit(c)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                      <button onClick={() => remove(c.code)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEdit(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold">{edit.code ? 'Edit' : 'Add'} Coupon</h2>
            <div className="mt-4 space-y-3">
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Code</span>
                <input placeholder="e.g. SAVE10" value={edit.code ?? ''} onChange={(e) => setEdit({ ...edit, code: e.target.value.toUpperCase() })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm uppercase outline-none focus:border-accent" />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Discount</span>
                <input placeholder="e.g. 0.1 for 10%" type="number" step="0.01" value={edit.discount ?? 0} onChange={(e) => setEdit({ ...edit, discount: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Max uses</span>
                  <input placeholder="0 = unlimited" type="number" value={edit.maxUses ?? 0} onChange={(e) => setEdit({ ...edit, maxUses: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Used count</span>
                  <input placeholder="Used count" type="number" value={edit.usedCount ?? 0} onChange={(e) => setEdit({ ...edit, usedCount: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={edit.active ?? true} onChange={(e) => setEdit({ ...edit, active: e.target.checked })} className="rounded border-border" />
                Active
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEdit(null)} className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-background">Cancel</button>
              <button onClick={save} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
