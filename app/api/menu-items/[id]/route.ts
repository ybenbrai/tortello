// ============================================================
// GET   /api/menu-items/[id]    — get by ID (public)
// PUT   /api/menu-items/[id]    — update (admin)
// DELETE /api/menu-items/[id]   — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { menuItems } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const row = await getDb().select().from(menuItems).where(eq(menuItems.id, id)).get()
    if (!row) return NOT_FOUND
    return ok(row)
  } catch {
    return err('Failed to fetch menu item', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    const body = await req.json()
    const updated = await getDb().update(menuItems).set(body).where(eq(menuItems.id, id)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update menu item', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { id } = await params
    await getDb().delete(menuItems).where(eq(menuItems.id, id))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete menu item', 500)
  }
}
