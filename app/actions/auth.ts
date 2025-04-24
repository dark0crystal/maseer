import { supabase } from '@/lib/supabase'

export async function signIn(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return {
      success: !error,
      error: error?.message
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An error occurred during sign in'
    }
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    return {
      success: !error,
      error: error?.message
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An error occurred during sign up'
    }
  }
}