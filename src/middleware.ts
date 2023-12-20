import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS, ROUTES } from '@/utils/config'
import { UserInfo } from '@/utils/interface'

//ROUTES not working in middleware
export const config = {
    // matcher: ['/work', '/profile', '/payment', '/my-audio'],
    matcher: ['/:path*'],
}

export async function middleware(request: NextRequest) {

    const allowedRoutes = ['/', '/login', '/registration', '/policy']

    const url = request.nextUrl.clone()
    const login = url
    login.pathname = ROUTES.LOGIN

    const tokenRequest = request.cookies.get('token')
    const userRequest = request.cookies.get('user')

    const middlewareAutorization = async (token: string) => {
        try {
            const response = await fetch(ENDPOINTS.USERS.GET_iNFO.url, {
                method: ENDPOINTS.USERS.GET_iNFO.method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data: UserInfo = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    if (tokenRequest) {
        const authenticated = await middlewareAutorization(tokenRequest.value)
        if (authenticated?.id) {
            const responseHeaders = new Headers()
            if (userRequest?.value !== JSON.stringify(authenticated)) {
                responseHeaders.append('Set-Cookie', `user=${JSON.stringify(authenticated)}`)
            }
            const response = NextResponse.next({
                headers: responseHeaders,
            })
            return response
        }
        else {
            if (!allowedRoutes.includes(url.pathname)) {
                console.log()
                return NextResponse.redirect(login, 302);   
            }
        }
    }
    else {
        if (!allowedRoutes.includes(url.pathname)) {
            return NextResponse.redirect(login, 302);   
        }
    }
}