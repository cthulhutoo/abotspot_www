import type { APIRoute } from 'astro'
import { signInWithGoogle } from '../../../lib/auth'

export const GET: APIRoute = async ({ redirect }) => {
  const { data, error } = await signInWithGoogle()

  if (error) {
    console.error('OAuth sign-in error:', error)
    return new Response(JSON.stringify({ error: 'Failed to initiate sign-in' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Redirect to Google OAuth URL
  return redirect(data.url)
}
