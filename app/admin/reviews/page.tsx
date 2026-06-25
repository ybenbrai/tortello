'use client'

// ============================================================
// Admin Reviews
// CRUD for customer testimonials
// ============================================================

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  cityEn: string
  cityFr: string
  cityAr: string
  rating: number
  textEn: string
  textFr: string
  textAr: string
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

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [edit, setEdit] = useState<Partial<Review> | null>(null)

  function load() {
    setLoading(true)
    setError(false)
    fetch('/api/reviews').then((r) => r.json()).then(setItems).catch(() => setError(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!edit) return
    const body = { ...edit }
    const res = edit.id
      ? await fetch(`/api/reviews/${edit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setEdit(null); load(); showFeedback(setFeedback, { type: 'success', message: 'Saved!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Save failed' }) }
  }

  async function remove(id: string) {
    if (!confirm('Delete this review?')) return
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
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
        <button onClick={() => setEdit({ id: '', name: '', cityEn: 'Casablanca', cityFr: 'Casablanca', cityAr: 'الدار البيضاء', rating: 5, textEn: '', textFr: '', textAr: '' })} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="size-4" /> Add Review</button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : error ? (
        <p className="py-10 text-center text-sm text-destructive">Failed to load reviews.</p>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <div key={r.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">{r.name}</span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < r.rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`} />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.cityEn}</p>
                <p className="mt-1 text-sm text-foreground line-clamp-2">{r.textEn}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEdit(r)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                <button onClick={() => remove(r.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEdit(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold">{edit.id ? 'Edit' : 'Add'} Review</h2>
            <div className="mt-4 space-y-3">
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">ID</span>
                <input placeholder="e.g. r4" value={edit.id ?? ''} onChange={(e) => setEdit({ ...edit, id: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Name</span>
                <input placeholder="Name" value={edit.name ?? ''} onChange={(e) => setEdit({ ...edit, name: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">City (EN)</span>
                  <input placeholder="City (EN)" value={edit.cityEn ?? ''} onChange={(e) => setEdit({ ...edit, cityEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">City (FR)</span>
                  <input placeholder="City (FR)" value={edit.cityFr ?? ''} onChange={(e) => setEdit({ ...edit, cityFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">City (AR)</span>
                  <input placeholder="City (AR)" value={edit.cityAr ?? ''} onChange={(e) => setEdit({ ...edit, cityAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
              </div>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Rating (1-5)</span>
                <input placeholder="Rating (1-5)" type="number" min={1} max={5} value={edit.rating ?? 5} onChange={(e) => setEdit({ ...edit, rating: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Text (EN)</span>
                <textarea placeholder="Text (EN)" value={edit.textEn ?? ''} onChange={(e) => setEdit({ ...edit, textEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Text (FR)</span>
                <textarea placeholder="Text (FR)" value={edit.textFr ?? ''} onChange={(e) => setEdit({ ...edit, textFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Text (AR)</span>
                <textarea placeholder="Text (AR)" value={edit.textAr ?? ''} onChange={(e) => setEdit({ ...edit, textAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
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
