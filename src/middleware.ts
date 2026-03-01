// Authentication Middleware for Board Routes
import { getSession } from './lib/auth'

// Check if request is for a board-protected route
function isBoardRoute(pathname: string): boolean {
  const boardRoutes = ['/board/dashboard', '/board/pipeline', '/board/discovery', '/board/funders', '/board/analytics', '/board/admin']
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
  
  // Check session and redirect unauthorized users
  const { session, error } = await getSession()
  
  if (!session || error) {
    // User not authenticated, redirect to login
    const loginUrl = new URL('/board/login', context.url)
    return Response.redirect(loginUrl)
  }
  
  // User is authenticated, proceed to the route
  return next()
}
