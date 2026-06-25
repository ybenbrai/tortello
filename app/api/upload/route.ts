// ============================================================
// POST /api/upload — file upload (admin only)
// ============================================================

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return err('No file provided', 400)

    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(join(process.cwd(), 'public', 'images', filename), buffer)

    return ok({ url: `/images/${filename}` })
  } catch {
    return err('Failed to upload file', 500)
  }
}
