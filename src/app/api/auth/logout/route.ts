import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    // Clear the session cookie
    const response = NextResponse.redirect(new URL('/login', request.nextUrl));
    
    // Set the cookie with expired date to remove it
    response.cookies.set('session', '', {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 0, // This makes the cookie expire immediately
    });
    
    return response;
}