import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) { 
    const session = await auth.api.getSession({
        headers: await headers()
    })

    //
    if (!session) {
      
        const requestedPath = request.nextUrl.pathname;

        
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirectTo', requestedPath);

        
        return NextResponse.redirect(loginUrl);
    }
}
 
export const config = {
    matcher: ['/add-idea', '/my-ideas', '/my-interactions', '/ideas/:id'], 
}