import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Only protect /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const adminAuthCookie = req.cookies.get('admin_auth');
    
    // If authenticated, allow the request to proceed
    if (adminAuthCookie && adminAuthCookie.value === 'authenticated') {
      return NextResponse.next();
    }

    // Otherwise, redirect to the custom admin login page
    const loginUrl = new URL('/admin-login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
