// ============================================================
// GET  /api/reviews     — list (public)
// POST /api/reviews     — create (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'
import { asc } from 'drizzle-orm'

export async function GET() {
  try {
    const rows = await getDb().select().from(reviews).orderBy(asc(reviews.id))
    return ok(rows)
  } catch {
    return err('Failed to fetch reviews', 500)
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body = await req.json()
    await getDb().insert(reviews).values(body)
    return ok(body, 201)
  } catch {
    return err('Failed to create review', 500)
  }
}
