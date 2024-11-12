import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/admin/login';
    const isProtected = path === '/admin/home' || path === '/admin/question' || path === '/admin/category'
    const token = request.cookies.get('token')?.value || ""
    const origin = request.nextUrl.origin; 
    
    if (isPublicPath && token)
        return NextResponse.redirect(`${origin}/admin/home`)
    else if (isProtected && !token)
        return NextResponse.redirect(`${origin}/admin/login`)
}

export const config = {
  matcher: [
    '/admin/home',
    '/admin/category',
    '/admin/question',
    '/admin/login'
  ],
}
