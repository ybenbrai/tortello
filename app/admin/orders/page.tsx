'use client'

// ============================================================
// Admin Orders
// List all orders with status filter, detail modal, status update
// ============================================================

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface OrderItem {
  id: number
  orderId: string
  filling: string
  style: string
  sauce: string
  extras: string
  quantity: number
  unitPrice: number
  labelEn: string
}

interface Order {
  id: string
  date: string
  total: number
  status: 'preparing' | 'on-the-way' | 'delivered'
  name: string
  phone: string
  address: string
  notes: string | null
  payment: 'cod' | 'card'
  coupon: string | null
  discount: number | null
  items: OrderItem[]
}

const statusColors: Record<string, string> = {
  preparing: 'bg-secondary/30 text-secondary-foreground',
  'on-the-way': 'bg-accent/20 text-accent-foreground',
  delivered: 'bg-primary/10 text-primary',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [detail, setDetail] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')

  function load() {
    setLoading(true)
    setError(false)
    const url = statusFilter ? `/api/orders?status=${statusFilter}` : '/api/orders'
    fetch(url).then((r) => r.json()).then(setOrders).catch(() => setError(true)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [statusFilter])

  async function updateStatus(orderId: string, status: string) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
    if (detail?.id === orderId) setDetail((prev) => prev ? { ...prev, status: status as Order['status'] } : null)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        {['', 'preparing', 'on-the-way', 'delivered'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary/30'
            }`}
          >
            {s ? s.replace('-', ' ') : 'All'}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Order</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Total</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Payment</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="border-t border-border">
                  {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                    <td key={j} className="px-4 py-3"><div className="h-5 w-full animate-pulse rounded bg-muted" /></td>
                  ))}
                </tr>
              ))
            ) : error ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-destructive">Failed to load orders.</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">No orders found.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-foreground">{o.date}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{o.name}</p>
                    <p className="text-xs text-muted-foreground">{o.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">{o.total} MAD</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{o.payment === 'cod' ? 'COD' : 'Card'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`rounded-lg px-2 py-1 text-xs font-medium outline-none ${statusColors[o.status]}`}
                    >
                      <option value="preparing">Preparing</option>
                      <option value="on-the-way">On the way</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setDetail(o)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setDetail(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-heading text-lg font-semibold">Order {detail.id}</h2>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{detail.date}</span></div>
                <div>
                  <span className="text-muted-foreground">Status:</span>{' '}
                  <select value={detail.status} onChange={(e) => updateStatus(detail.id, e.target.value)} className={`rounded-lg px-2 py-0.5 text-xs font-medium outline-none ${statusColors[detail.status]}`}>
                    <option value="preparing">Preparing</option>
                    <option value="on-the-way">On the way</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div><span className="text-muted-foreground">Customer:</span> <span className="font-medium">{detail.name}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{detail.phone}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-medium">{detail.address}</span></div>
                {detail.notes && <div className="col-span-2"><span className="text-muted-foreground">Notes:</span> <span className="font-medium">{detail.notes}</span></div>}
                <div><span className="text-muted-foreground">Payment:</span> <span className="font-medium">{detail.payment === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</span></div>
                {detail.coupon && <div><span className="text-muted-foreground">Coupon:</span> <span className="font-medium">{detail.coupon} (-{Math.round((detail.discount ?? 0) * 100)}%)</span></div>}
              </div>

              <div>
                <h3 className="mb-2 font-medium text-sm text-foreground">Items</h3>
                <div className="space-y-2">
                  {detail.items.map((item) => (
                    <div key={item.id} className="flex justify-between rounded-xl bg-background px-3 py-2 text-sm">
                      <span className="font-medium">{item.labelEn} × {item.quantity}</span>
                      <span className="text-muted-foreground">{item.unitPrice * item.quantity} MAD</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t border-border pt-3 font-heading text-lg font-semibold">
                <span>Total</span>
                <span>{detail.total} MAD</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setDetail(null)} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
