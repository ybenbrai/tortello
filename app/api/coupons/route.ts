// ============================================================
// GET  /api/coupons     — list (public)
// POST /api/coupons     — create (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { coupons } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'
import { asc } from 'drizzle-orm'

export async function GET() {
  try {
    const rows = await getDb().select().from(coupons).orderBy(asc(coupons.code))
    return ok(rows)
  } catch {
    return err('Failed to fetch coupons', 500)
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body = await req.json()
    await getDb().insert(coupons).values(body)
    return ok(body, 201)
  } catch {
    return err('Failed to create coupon', 500)
  }
}
