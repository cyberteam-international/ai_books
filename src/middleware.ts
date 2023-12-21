import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS, ROUTES } from '@/utils/config'
import { UserInfo } from '@/utils/interface'

//ROUTES not working in middleware
export const config = {
    matcher: ['/work', '/profile', '/payment', '/my-audio'],
    // matcher: ['/:path*'],
}

export async function middleware(request: NextRequest) {

    const login = request.nextUrl.clone()
    login.pathname = ROUTES.LOGIN

    const tokenRequest = request.cookies.get('token')

    if (!tokenRequest) {
        return NextResponse.redirect(login.href, 302);
    }
}