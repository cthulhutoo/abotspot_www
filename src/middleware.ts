// Authentication Middleware for Board Routes
// Simple version to avoid build errors

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
  
  // TODO: Check session and redirect unauthorized users to /board/login
  // This will be implemented once auth is working
  
  return next()
}
