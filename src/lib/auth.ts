// Authentication Helpers for Supabase + Google OAuth
// Uses relative imports to avoid Vite build issues

import type { APIRoute } from 'astro/api'
import type { AstroGlobal } from 'astro'
import { supabase } from './supabase'

// Supabase client type
type SupabaseClient = {
  auth: {
    signIn: (options: any) => Promise<any>
    signOut: () => Promise<any>
    getSession: () => Promise<any>
    getUser: () => Promise<any>
  }
  from: (table: string, options?: any) => any
}

/**
 * Get current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

/**
 * Get current user
 */
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${import.meta.env.SITE_URL || 'https://abotspot.com'}/board/dashboard`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  })
  return { data, error }
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Check if user is board member
 */
export async function isBoardMember(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('board_members')
    .select('id')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  return true
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('board_members')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  return data.role === 'admin'
}

/**
 * Get board member profile
 */
export async function getBoardMember(userId: string) {
  const { data, error } = await supabase
    .from('board_members')
    .select(`
      *,
      users!inner (
        email
      )
    `)
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

/**
 * Get all board members (admin only)
 */
export async function getAllBoardMembers() {
  const { data, error } = await supabase
    .from('board_members')
    .select(`
      *,
      users!inner (
        email
      )
    `)
    .order('joined_at', { ascending: true })
  
  return { data, error }
}

/**
 * Invite new board member (admin only)
 */
export async function inviteBoardMember(email: string, name: string, role: 'admin' | 'chair' | 'member') {
  const { data, error } = await supabase
    .from('board_members')
    .insert({
      name,
      role
    })
    .select()
    .single()
  
  // TODO: Send invitation email via SMTP
  // Would integrate with imap-smtp-email skill to send invite
  
  return { data, error }
}

/**
 * Handle OAuth callback - check if user is board member
 */
export async function handleAuthCallback(userId: string, email: string) {
  // Check if user exists in users table
  // This is handled by Supabase automatically
  
  // Check if user is authorized board member
  const isAuthorized = await isBoardMember(userId)
  
  return isAuthorized
}
