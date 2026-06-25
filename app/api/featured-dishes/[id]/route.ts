// ============================================================
// GET   /api/featured-dishes/[id]    — get by ID (public)
// PUT   /api/featured-dishes/[id]    — update (admin)
// DELETE /api/featured-dishes/[id]   — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { featuredDishes } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const row = await getDb().select().from(featuredDishes).where(eq(featuredDishes.id, id)).get()
    if (!row) return NOT_FOUND
    return ok(row)
  } catch {
    return err('Failed to fetch featured dish', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    const body = await req.json()
    const updated = await getDb().update(featuredDishes).set(body).where(eq(featuredDishes.id, id)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update featured dish', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    await getDb().delete(featuredDishes).where(eq(featuredDishes.id, id))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete featured dish', 500)
  }
}
