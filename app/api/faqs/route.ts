// ============================================================
// GET  /api/faqs     — list (public)
// POST /api/faqs     — create (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { faqs } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'
import { asc } from 'drizzle-orm'

export async function GET() {
  try {
    const rows = await getDb().select().from(faqs).orderBy(asc(faqs.sortOrder))
    return ok(rows)
  } catch {
    return err('Failed to fetch FAQs', 500)
  }
}

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body = await req.json()
    await getDb().insert(faqs).values(body)
    return ok(body, 201)
  } catch {
    return err('Failed to create FAQ', 500)
  }
}
