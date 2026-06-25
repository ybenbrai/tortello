'use client'

// ============================================================
// Admin Featured Dishes
// CRUD for homepage featured dish presets
// ============================================================

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Dish {
  id: string
  nameEn: string
  nameFr: string
  nameAr: string
  descEn: string
  descFr: string
  descAr: string
  price: number
  image: string
  tagEn: string | null
  tagFr: string | null
  tagAr: string | null
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

export default function AdminFeaturedPage() {
  const [items, setItems] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [edit, setEdit] = useState<Partial<Dish> | null>(null)

  function load() {
    setLoading(true)
    setError(false)
    fetch('/api/featured-dishes').then((r) => r.json()).then(setItems).catch(() => setError(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!edit) return
    const body = { ...edit }
    const res = edit.id
      ? await fetch(`/api/featured-dishes/${edit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/featured-dishes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setEdit(null); load(); showFeedback(setFeedback, { type: 'success', message: 'Saved!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Save failed' }) }
  }

  async function remove(id: string) {
    if (!confirm('Delete this dish?')) return
    const res = await fetch(`/api/featured-dishes/${id}`, { method: 'DELETE' })
    if (res.ok) { load(); showFeedback(setFeedback, { type: 'success', message: 'Deleted!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Delete failed' }) }
  }

  function newItem() {
    setEdit({ id: '', nameEn: '', nameFr: '', nameAr: '', descEn: '', descFr: '', descAr: '', price: 0, image: '', tagEn: '', tagFr: '', tagAr: '', sortOrder: items.length + 1 })
  }

  return (
    <div>
      {feedback && (
        <p className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${feedback.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
          {feedback.message}
        </p>
      )}
      <div className="mb-4 flex justify-end">
        <button onClick={newItem} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="size-4" /> Add Dish</button>
      </div>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : error ? (
        <p className="py-10 text-center text-sm text-destructive">Failed to load featured dishes.</p>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No featured dishes yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((dish) => (
            <div key={dish.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              {dish.image && <img src={dish.image} alt="" className="h-40 w-full object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{dish.nameEn}</h3>
                    <p className="text-sm text-muted-foreground">{dish.nameFr} / {dish.nameAr}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEdit(dish)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                    <button onClick={() => remove(dish.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{dish.descEn}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-foreground">{dish.price} MAD</span>
                  {dish.tagEn && <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{dish.tagEn}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEdit(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold">{edit.id ? 'Edit' : 'Add'} Dish</h2>
            <div className="mt-4 space-y-3">
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">ID</span>
                <input placeholder="ID" value={edit.id ?? ''} onChange={(e) => setEdit({ ...edit, id: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Name (EN)</span>
                  <input placeholder="Name (EN)" value={edit.nameEn ?? ''} onChange={(e) => setEdit({ ...edit, nameEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Name (FR)</span>
                  <input placeholder="Name (FR)" value={edit.nameFr ?? ''} onChange={(e) => setEdit({ ...edit, nameFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Name (AR)</span>
                  <input placeholder="Name (AR)" value={edit.nameAr ?? ''} onChange={(e) => setEdit({ ...edit, nameAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Desc (EN)</span>
                  <textarea placeholder="Desc (EN)" value={edit.descEn ?? ''} onChange={(e) => setEdit({ ...edit, descEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Desc (FR)</span>
                  <textarea placeholder="Desc (FR)" value={edit.descFr ?? ''} onChange={(e) => setEdit({ ...edit, descFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Desc (AR)</span>
                  <textarea placeholder="Desc (AR)" value={edit.descAr ?? ''} onChange={(e) => setEdit({ ...edit, descAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" rows={2} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Price (MAD)</span>
                  <input placeholder="Price (MAD)" type="number" value={edit.price ?? 0} onChange={(e) => setEdit({ ...edit, price: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Image path</span>
                  <input placeholder="Image path" value={edit.image ?? ''} onChange={(e) => setEdit({ ...edit, image: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Tag (EN)</span>
                  <input placeholder="Tag (EN)" value={edit.tagEn ?? ''} onChange={(e) => setEdit({ ...edit, tagEn: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Tag (FR)</span>
                  <input placeholder="Tag (FR)" value={edit.tagFr ?? ''} onChange={(e) => setEdit({ ...edit, tagFr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Tag (AR)</span>
                  <input placeholder="Tag (AR)" value={edit.tagAr ?? ''} onChange={(e) => setEdit({ ...edit, tagAr: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
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
