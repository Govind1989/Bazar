import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname } = url
  const hostname = req.headers.get('host') || ''

  // Define allowed domains for the main marketplace
  const marketplaceDomains = ['bazar.com', 'localhost:3000']
  const isMarketplace = marketplaceDomains.some(domain => hostname.includes(domain))

  // If it's a vendor subdomain (e.g., apple.bazar.com)
  // we would rewrite to /[vendor] internally
  // For this scaffold, we'll focus on the subpath-based multi-tenancy first
  
  if (pathname.startsWith('/dashboard')) {
    // Add logic to check for vendor session
    // console.log('Checking vendor session for dashboard access')
  }

  if (pathname.startsWith('/admin')) {
    // Add logic to check for super-admin session
    // console.log('Checking admin session for platform access')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
