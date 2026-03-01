---
// OAuth Callback Handler
// Handles Supabase authentication callback from Google

import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const GET: APIRoute = async ({ url, redirect, cookies }) => {
  // Get access token and refresh token from URL
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    console.error('OAuth error:', error)
    return redirect('/board/login?error=oauth_error')
  }

  if (!code) {
    console.error('No code in callback')
    return redirect('/board/login?error=no_code')
  }

  // Exchange code for session
  const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

  if (sessionError) {
    console.error('Session exchange error:', sessionError)
    return redirect('/board/login?error=session_error')
  }

  if (!session) {
    console.error('No session created')
    return redirect('/board/login?error=no_session')
  }

  // Check if user is authorized board member
  const userId = session.user.id
  const { data: boardMember, error: boardError } = await supabase
    .from('board_members')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (boardError || !boardMember) {
    console.error('User not authorized as board member:', userId)
    await supabase.auth.signOut()
    return redirect('/board/login?error=unauthorized')
  }

  // Set session cookie (Supabase handles this automatically)
  // Redirect to dashboard
  return redirect('/board/dashboard')
}
