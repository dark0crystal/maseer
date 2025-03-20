

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function signUp(email: string, password: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function signIn(email: string, password: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function signOut() {
  const supabase = createServerComponentClient({ cookies })
  await supabase.auth.signOut()
} 
