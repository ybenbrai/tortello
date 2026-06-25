// ============================================================
// POST /api/admin/login — authenticate (sets cookie)
// GET  /api/admin/login — check session
// DELETE /api/admin/login — logout (clears cookie)
// ============================================================

import { cookies } from 'next/headers'
import { ok, err } from '@/lib/api-response'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (password !== process.env.ADMIN_PASSWORD) {
      return err('Invalid password', 401)
    }
    const token = Buffer.from(password).toString('base64')
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
    return ok({ authenticated: true })
  } catch {
    return err('Invalid request body', 400)
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  return ok({ ok: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return err('Not authenticated', 401)
  const valid = Buffer.from(token, 'base64').toString('utf-8') === process.env.ADMIN_PASSWORD
  if (!valid) return err('Not authenticated', 401)
  return ok({ authenticated: true })
}
