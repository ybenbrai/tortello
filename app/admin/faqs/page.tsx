'use client'

// ============================================================
// Admin FAQs
// CRUD for frequently asked questions
// ============================================================

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

interface Faq {
  id: string
  qEn: string
  qFr: string
  qAr: string
  aEn: string
  aFr: string
  aAr: string
  sortOrder: number
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

export default function AdminFaqsPage() {
  const [items, setItems] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [edit, setEdit] = useState<Partial<Faq> | null>(null)

  function load() {
    setLoading(true)
    setError(false)
    fetch('/api/faqs').then((r) => r.json()).then(setItems).catch(() => setError(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!edit) return
    const body = { ...edit }
    const res = edit.id
      ? await fetch(`/api/faqs/${edit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setEdit(null); load(); showFeedback(setFeedback, { type: 'success', message: 'Saved!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Save failed' }) }
  }

  async function remove(id: string) {
    if (!confirm('Delete this FAQ?')) return
    const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
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
        <button onClick={() => setEdit({ id: '', qEn: '', qFr: '', qAr: '', aEn: '', aFr: '', aAr: '', sortOrder: items.length + 1 })} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="size-4" /> Add FAQ</button>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : error ? (
        <p className="py-10 text-center text-sm text-destructive">Failed to load FAQs.</p>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No FAQs yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((faq) => (
            <div key={faq.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card px-4 py-3">
              <GripVertical className="mt-1 size-4 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{faq.qEn}</p>
                <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{faq.aEn}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEdit(faq)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                <button onClick={() => remove(faq.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEdit(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold">{edit.id ? 'Edit' : 'Add'} FAQ</h2>
            <div className="mt-4 space-y-3">
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">ID</span>
                <input placeholder="e.g. f5" value={edit.id ?? ''} onChange={(e) => setEdit({ ...edit, id: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Question (EN)</span>
                <input placeholder="Question (EN)" value={edit.qEn ?? ''} onChange={(e) => setEdit({ ...edit, qEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Question (FR)</span>
                  <input placeholder="Question (FR)" value={edit.qFr ?? ''} onChange={(e) => setEdit({ ...edit, qFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Question (AR)</span>
                  <input placeholder="Question (AR)" value={edit.qAr ?? ''} onChange={(e) => setEdit({ ...edit, qAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
              </div>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Answer (EN)</span>
                <textarea placeholder="Answer (EN)" value={edit.aEn ?? ''} onChange={(e) => setEdit({ ...edit, aEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Answer (FR)</span>
                  <textarea placeholder="Answer (FR)" value={edit.aFr ?? ''} onChange={(e) => setEdit({ ...edit, aFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Answer (AR)</span>
                  <textarea placeholder="Answer (AR)" value={edit.aAr ?? ''} onChange={(e) => setEdit({ ...edit, aAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
                </label>
              </div>
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">Sort order</span>
                <input placeholder="Sort order" type="number" value={edit.sortOrder ?? 0} onChange={(e) => setEdit({ ...edit, sortOrder: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
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
