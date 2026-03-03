// Authentication Middleware for Board Routes
// NOTE: Authentication is now client-side only
// This middleware exists only to add the client-side auth script to all board pages

import type { APIRoute } from 'astro'

// Check if request is for a board-protected route
function isBoardRoute(pathname: string): boolean {
  const boardRoutes = ['/board/dashboard', '/board/pipeline', '/board/discovery', '/board/funders', '/board/analytics', '/board/alerts']
  return boardRoutes.some(route => pathname.startsWith(route))
}

export async function onRequest(context: { request: Request; url: URL }, next: () => Promise<Response>) {
  const { pathname } = new URL(context.request.url)
  
  // Only add auth script to board routes
  if (!isBoardRoute(pathname)) {
    return next()
  }
  
  // Skip for login and callback (they have their own logic)
  if (pathname === '/board/login' || pathname === '/auth/callback') {
    return next()
  }
  
  // Return the page with auth script injected
  return next()
}
