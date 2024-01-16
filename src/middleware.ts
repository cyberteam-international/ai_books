import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from '@/utils/config'

export const config = {
    matcher: ['/profile', '/payment', '/my-audio'],
}

export async function middleware(request: NextRequest) {

    const login = request.nextUrl.clone()
    login.pathname = ROUTES.LOGIN

    const tokenRequest = request.cookies.get('token')

    if (!tokenRequest) {
        return NextResponse.redirect(login.href, 302);
    }
}