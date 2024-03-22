import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from '@/utils/config'
import { UserInfo } from './utils/interface'

export const config = {
    matcher: ['/profile', '/payment', '/my-audio', '/statistic', '/preparation', '/users'],
}

export async function middleware(request: NextRequest) {

    const login = request.nextUrl.clone()
    const work = request.nextUrl.clone()
    login.pathname = ROUTES.LOGIN
    work.pathname = ROUTES.WORK

    const tokenRequest = request.cookies.get('token')

    if (!tokenRequest) {
        return NextResponse.redirect(login.href, 302);
    }
    else {
        const response = await fetch(process.env.BACKEND_URL + '/users', {
            headers: {
                Authorization: `Bearer ${tokenRequest.value}`,
            },
        });
        const user: UserInfo = await response.json();
        if (!user.is_admin) {
            // if (request.nextUrl.pathname === '/statistic' || request.nextUrl.pathname === '/users') {
            //     return NextResponse.redirect(work, 302);
            // }
        }
        
        if (request.nextUrl.pathname === '/preparation' && !user.balance) {
            return NextResponse.redirect(work, 302);
        }
    }
}