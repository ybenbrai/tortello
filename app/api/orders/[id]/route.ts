// ============================================================
// GET    /api/orders/[id] — get by ID (public)
// PUT    /api/orders/[id] — update status (admin)
// DELETE /api/orders/[id] — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { orders, orderItems } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const order = await getDb().select().from(orders).where(eq(orders.id, id)).get()
    if (!order) return NOT_FOUND
    const items = await getDb().select().from(orderItems).where(eq(orderItems.orderId, id))
    return ok({ ...order, items })
  } catch {
    return err('Failed to fetch order', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    const body = await req.json()
    const updated = await getDb().update(orders).set(body).where(eq(orders.id, id)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update order', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    await getDb().delete(orders).where(eq(orders.id, id))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete order', 500)
  }
}
