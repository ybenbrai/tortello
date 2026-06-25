'use client'

// ============================================================
// Admin Products (Menu Items)
// CRUD for fillings, cooking styles, sauces, extras
// Tabbed interface with inline edit modal
// ============================================================

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

const tabs = ['filling', 'style', 'sauce', 'extra'] as const
type Tab = (typeof tabs)[number]
const tabLabels: Record<Tab, string> = { filling: 'Fillings', style: 'Cooking Styles', sauce: 'Sauces', extra: 'Extras' }

interface Item {
  id: string
  type: Tab
  nameEn: string
  nameFr: string
  nameAr: string
  price: number
  image: string | null
  descEn: string | null
  descFr: string | null
  descAr: string | null
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

export default function AdminProductsPage() {
  const [tab, setTab] = useState<Tab>('filling')
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [edit, setEdit] = useState<Partial<Item> | null>(null)

  function load() {
    setLoading(true)
    setError(false)
    fetch(`/api/menu-items?type=${tab}`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [tab])

  async function save() {
    if (!edit) return
    const body = { ...edit, type: tab }
    const res = edit.id
      ? await fetch(`/api/menu-items/${edit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/menu-items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setEdit(null); load(); showFeedback(setFeedback, { type: 'success', message: 'Saved!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Save failed' }) }
  }

  async function remove(id: string) {
    if (!confirm('Delete this item?')) return
    const res = await fetch(`/api/menu-items/${id}`, { method: 'DELETE' })
    if (res.ok) { load(); showFeedback(setFeedback, { type: 'success', message: 'Deleted!' }) }
    else { showFeedback(setFeedback, { type: 'error', message: 'Delete failed' }) }
  }

  function newItem() {
    setEdit({ id: '', nameEn: '', nameFr: '', nameAr: '', price: 0, image: '', descEn: '', descFr: '', descAr: '', sortOrder: items.length + 1 })
  }

  return (
    <div>
      {feedback && (
        <p className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${feedback.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
          {feedback.message}
        </p>
      )}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {tabLabels[t]}
            </button>
          ))}
        </div>
        <button onClick={newItem} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="flex h-16 animate-pulse items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3" />
          ))
        ) : error ? (
          <p className="py-10 text-center text-sm text-destructive">Failed to load items.</p>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No items yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3">
              <GripVertical className="size-4 text-muted-foreground" />
              {item.image && <img src={item.image} alt="" className="size-10 rounded-xl object-cover" />}
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.nameEn}</p>
                <p className="text-sm text-muted-foreground">{item.nameFr} / {item.nameAr}</p>
              </div>
              <p className="font-semibold text-foreground">{item.price} MAD</p>
              <div className="flex gap-1">
                <button onClick={() => setEdit(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                <button onClick={() => remove(item.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEdit(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold text-foreground">{edit.id ? 'Edit' : 'Add'} {tabLabels[tab]}</h2>
            <div className="mt-4 space-y-3">
              <label>
                <span className="mb-1 block text-sm font-medium text-foreground">ID</span>
                <input placeholder="e.g. cheese" value={edit.id ?? ''} onChange={(e) => setEdit({ ...edit, id: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
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
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Price (MAD)</span>
                  <input placeholder="Price (MAD)" type="number" value={edit.price ?? 0} onChange={(e) => setEdit({ ...edit, price: +e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium text-foreground">Image path</span>
                  <input placeholder="e.g. /images/foo.png" value={edit.image ?? ''} onChange={(e) => setEdit({ ...edit, image: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent" />
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
