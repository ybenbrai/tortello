// ============================================================
// GET  /api/featured-dishes     — list (public)
// POST /api/featured-dishes     — create (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { featuredDishes } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'
import { asc } from 'drizzle-orm'

export async function GET() {
  try {
    const rows = await getDb().select().from(featuredDishes).orderBy(asc(featuredDishes.sortOrder))
    return ok(rows)
  } catch {
    return err('Failed to fetch featured dishes', 500)
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body = await req.json()
    await getDb().insert(featuredDishes).values(body)
    return ok(body, 201)
  } catch {
    return err('Failed to create featured dish', 500)
  }
}
