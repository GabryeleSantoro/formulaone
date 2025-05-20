import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { User } from './lib/models/users'

const protectedRoutes = ['/dashboard', '/profile', '/api']
const publicRoutes = ['/login', '/signup', '/', '/password-reset']
 
export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
 
    const cookie = (await cookies()).get('session')?.value
    const session = cookie ? JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8')) as User : null 

    if (isProtectedRoute && !session?._id) {

      const headers = new Headers();
      headers.set('x-pathname', path);
      return NextResponse.redirect(new URL('/login', req.nextUrl), { headers });
    }
 
    if (shouldRedirectToDashboard(isPublicRoute, session, req)) {
      const headers = new Headers();
      headers.set('x-pathname', path);
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl),{headers} )
    }
 
    return NextResponse.next({ headers: { 'x-pathname': path } })
}

function shouldRedirectToDashboard(isPublicRoute: boolean, session: User | null, req: NextRequest): boolean {
  return (
    isPublicRoute &&
    !!session?._id &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  );
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
