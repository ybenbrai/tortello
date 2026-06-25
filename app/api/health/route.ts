// ============================================================
// GET /api/health — DB health check
// ============================================================

import { getDb } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { ok, err } from '@/lib/api-response'
import { count } from 'drizzle-orm'

export async function GET() {
  try {
    const result = await getDb().select({ count: count() }).from(orders)
    return ok({ status: 'ok', orders: result[0].count })
  } catch {
    return err('Database connection failed', 500)
  }
}
