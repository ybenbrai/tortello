// ============================================================
// GET /api/settings — get all settings (public)
// PUT /api/settings — bulk update settings (admin)
// ============================================================

import { getDb } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'

export async function GET() {
  try {
    const rows = await getDb().select().from(siteSettings)
    const map: Record<string, string> = {}
    for (const r of rows) map[r.key] = r.value
    return ok(map)
  } catch {
    return err('Failed to fetch settings', 500)
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const body: Record<string, string> = await req.json()
    const db = getDb()
    for (const [key, value] of Object.entries(body)) {
      await db.insert(siteSettings).values({ key, value }).onConflictDoUpdate({ target: siteSettings.key, set: { value } })
    }
    return ok({ ok: true })
  } catch {
    return err('Failed to update settings', 500)
  }
}
