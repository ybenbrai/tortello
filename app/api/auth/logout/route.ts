import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { ok, err } from '@/lib/api-response'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.signOut()
    if (error) return err(error.message, 500)
    return ok({ success: true })
  } catch {
    return err('Failed to logout', 500)
  }
}
