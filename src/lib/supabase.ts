// Supabase Client Configuration
// Simplified to avoid Vite build issues with @/ imports

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://myqyqdiaoojoglxjwtnu.supabase.co'
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check SUPABASE_URL and SUPABASE_ANON_KEY.')
  throw new Error('Supabase environment variables not configured')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
