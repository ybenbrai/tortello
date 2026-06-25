// ============================================================
// GET   /api/reviews/[id]    — get by ID (public)
// PUT   /api/reviews/[id]    — update (admin)
// DELETE /api/reviews/[id]   — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const row = await getDb().select().from(reviews).where(eq(reviews.id, id)).get()
    if (!row) return NOT_FOUND
    return ok(row)
  } catch {
    return err('Failed to fetch review', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    const body = await req.json()
    const updated = await getDb().update(reviews).set(body).where(eq(reviews.id, id)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update review', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    await getDb().delete(reviews).where(eq(reviews.id, id))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete review', 500)
  }
}
