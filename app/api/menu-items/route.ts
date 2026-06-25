// ============================================================
// GET  /api/menu-items?type= — list (public)
// POST /api/menu-items      — create (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { menuItems } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'
import { asc, eq } from 'drizzle-orm'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') as 'filling' | 'style' | 'sauce' | 'extra' | null
    const where = type ? eq(menuItems.type, type) : undefined
    const rows = await getDb().select().from(menuItems).where(where).orderBy(asc(menuItems.sortOrder))
    return ok(rows)
  } catch {
    return err('Failed to fetch menu items', 500)
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body = await req.json()
    await getDb().insert(menuItems).values(body)
    return ok(body, 201)
  } catch {
    return err('Failed to create menu item', 500)
  }
}
