import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function getAuthUser() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const result = await getDb().select().from(users).where(eq(users.id, user.id)).limit(1)
  if (result.length === 0) return null

  return { id: result[0].id, name: result[0].name, email: result[0].email, phone: result[0].phone }
}
