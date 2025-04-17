import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function signIn(email: string, password: string) {
  const supabase = createClientComponentClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return {
    success: !error,
    error: error?.message
  }
}

export async function signUp(email: string, password: string) {
  const supabase = createClientComponentClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  return {
    success: !error,
    error: error?.message
  }
} 