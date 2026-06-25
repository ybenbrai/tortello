import { getAuthUser } from '@/lib/auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) return UNAUTHORIZED
    return ok({ user })
  } catch {
    return err('Failed to get user', 500)
  }
}
