// ============================================================
// API Auth
// Admin authentication via cookie-based token check
// ============================================================

import { cookies } from 'next/headers'

export async function checkAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return false
    return Buffer.from(token, 'base64').toString('utf-8') === process.env.ADMIN_PASSWORD
  } catch {
    return false
  }
}
