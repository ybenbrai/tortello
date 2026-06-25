// ============================================================
// GET   /api/coupons/[code]    — get by code (public)
// PUT   /api/coupons/[code]    — update (admin)
// DELETE /api/coupons/[code]   — delete (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { coupons } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED, NOT_FOUND } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params
    const row = await getDb().select().from(coupons).where(eq(coupons.code, code)).get()
    if (!row) return NOT_FOUND
    return ok(row)
  } catch {
    return err('Failed to fetch coupon', 500)
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { code } = await params
    const body = await req.json()
    const updated = await getDb().update(coupons).set(body).where(eq(coupons.code, code)).returning()
    if (!updated.length) return NOT_FOUND
    return ok(updated[0])
  } catch {
    return err('Failed to update coupon', 500)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const { code } = await params
    await getDb().delete(coupons).where(eq(coupons.code, code))
    return ok({ ok: true })
  } catch {
    return err('Failed to delete coupon', 500)
  }
}
