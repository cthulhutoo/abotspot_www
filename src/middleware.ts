// Authentication Middleware for Board Routes
import { getSession } from './lib/auth'
import { supabase } from './lib/supabase'

// Check if request is for a board-protected route
function isBoardRoute(pathname: string): boolean {
  const boardRoutes = ['/board/dashboard', '/board/pipeline', '/board/discovery', '/board/funders', '/board/analytics', '/board/alerts']
  return boardRoutes.some(route => pathname.startsWith(route))
}

export async function onRequest(context: { request: Request; url: URL }, next: () => Promise<Response>) {
  const { pathname } = new URL(context.request.url)
  
  // Skip middleware for non-board routes
  if (!isBoardRoute(pathname)) {
    return next()
  }
  
  // Skip middleware for login page itself
  if (pathname === '/board/login') {
    return next()
  }
  
  // Skip middleware for auth callback page
  if (pathname === '/auth/callback') {
    return next()
  }
  
  // Check session and redirect unauthorized users
  const { session, error: sessionError } = await getSession()
  
  if (!session || sessionError) {
    // User not authenticated, redirect to login
    const loginUrl = new URL('/board/login', context.url)
    return Response.redirect(loginUrl)
  }
  
  // Check if user is board member
  const { data: boardMember } = await supabase
    .from('board_members')
    .select('id')
    .eq('user_id', session.user.id)
    .single()
  
  if (!boardMember) {
    // User is authenticated but not a board member
    await supabase.auth.signOut()
    const loginUrl = new URL('/board/login?error=unauthorized', context.url)
    return Response.redirect(loginUrl)
  }
  
  // User is authenticated and is a board member, proceed
  return next()
}
