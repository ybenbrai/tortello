import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { ok, err } from '@/lib/api-response'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json()
    if (!name || !email || !phone || !password) {
      return err('All fields are required', 400)
    }
    if (password.length < 6) {
      return err('Password must be at least 6 characters', 400)
    }

    const existing = await getDb().select().from(users).where(eq(users.email, email)).limit(1)
    if (existing.length > 0) {
      return err('Email already registered', 409)
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error || !data.user) {
      return err(error?.message || 'Failed to register', 400)
    }

    const createdAt = new Date().toISOString().slice(0, 10)
    await getDb().insert(users).values({ id: data.user.id, name, email, phone, createdAt })

    return ok({
      user: { id: data.user.id, name, email, phone },
    }, 201)
  } catch {
    return err('Failed to register', 500)
  }
}
