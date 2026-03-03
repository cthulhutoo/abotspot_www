import type { APIRoute } from 'astro'
import { signInWithGoogle } from '../../../lib/auth'

// Pre-render this route as false to make it server-side only
export const prerender = false

export const GET: APIRoute = async ({ redirect }) => {
  const { data, error } = await signInWithGoogle()

  if (error) {
    console.error('OAuth sign-in error:', error)
    // Redirect to login page with error instead of returning JSON
    // Returning JSON causes browser to download file instead of navigating
    return redirect('/board/login?error=oauth_error')
  }

  // Redirect to Google OAuth URL
  return redirect(data.url)
}
