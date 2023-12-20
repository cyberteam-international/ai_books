import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS, ROUTES } from '@/utils/config'
import { UserInfo } from '@/utils/interface'

//ROUTES not working in middleware
export const config = {
    matcher: ['/work', '/profile', '/payment', '/my-audio'],
}

export async function middleware(request: NextRequest) {

    const login = request.nextUrl.clone()
    login.pathname = ROUTES.LOGIN

    const tokenRequest = request.cookies.get('token')

    const moddlewareAutorization = async (token: string) => {
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
        const authenticated = await moddlewareAutorization(tokenRequest.value)
        if (authenticated?.id) {
            const responseHeaders = new Headers()
            responseHeaders.append('Set-Cookie', `user=${JSON.stringify(authenticated)}`)
            const response = NextResponse.next({
                request: {
                    headers: new Headers(request.headers),
                },
                headers: responseHeaders
            })
            return response
        }
        else {
            return Response.redirect(login, 302);
        }
    }
    else return Response.redirect(login, 302);
}