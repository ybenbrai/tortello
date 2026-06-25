import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { ok, err } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return err('Email and password are required', 400)
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      return err(error?.message === 'Invalid login credentials'
        ? 'Invalid email or password'
        : error?.message || 'Failed to login', 401)
    }

    const result = await getDb().select().from(users).where(eq(users.id, data.user.id)).limit(1)
    if (result.length === 0) {
      await supabase.auth.signOut()
      return err('Account not found', 401)
    }

    const user = result[0]
    return ok({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone } })
  } catch {
    return err('Failed to login', 500)
  }
}
