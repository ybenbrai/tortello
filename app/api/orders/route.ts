// ============================================================
// GET  /api/orders     — list (public)
// POST /api/orders     — create (public, no auth)
// ============================================================

import { getDb } from '@/lib/db'
import { orders, orderItems } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err } from '@/lib/api-response'
import { desc, eq } from 'drizzle-orm'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') as 'preparing' | 'on-the-way' | 'delivered' | null
    const where = status ? eq(orders.status, status) : undefined
    const rows = await getDb().select().from(orders).where(where).orderBy(desc(orders.date))
    const result = await Promise.all(
      rows.map(async (o) => {
        const items = await getDb().select().from(orderItems).where(eq(orderItems.orderId, o.id))
        return { ...o, items }
      }),
    )
    return ok(result)
  } catch {
    return err('Failed to fetch orders', 500)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, ...orderData } = body
    const id = `TRT-${Math.floor(10000 + Math.random() * 89999)}`
    await getDb().insert(orders).values({ ...orderData, id, date: new Date().toISOString().slice(0, 10) })
    if (items?.length) {
      await getDb().insert(orderItems).values(items.map((i: any) => ({ ...i, orderId: id })))
    }
    return ok({ id }, 201)
  } catch {
    return err('Failed to create order', 500)
  }
}
