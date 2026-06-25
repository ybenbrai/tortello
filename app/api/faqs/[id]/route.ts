// ============================================================
// GET   /api/faqs/[id]    — get by ID (public)
// PUT   /api/faqs/[id]    — update (admin)
// DELETE /api/faqs/[id]   — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { faqs } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const row = await getDb().select().from(faqs).where(eq(faqs.id, id)).get()
    if (!row) return NOT_FOUND
    return ok(row)
  } catch {
    return err('Failed to fetch FAQ', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    const body = await req.json()
    const updated = await getDb().update(faqs).set(body).where(eq(faqs.id, id)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update FAQ', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    await getDb().delete(faqs).where(eq(faqs.id, id))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete FAQ', 500)
  }
}
