import { NextRequest, NextResponse } from 'next/server'
import { authRoutes, protectedRoutes } from './router/routes'

export function middleware(request: NextRequest) {
  const current_user = request.cookies.get('@xs:user')?.value
  const current_token = request.cookies.get('@xs:token')?.value

  if (protectedRoutes.includes(request.nextUrl.pathname) && !current_user) {
    request.cookies.delete('@xs:user')
    request.cookies.delete('@xs:token')
    const response = NextResponse.redirect(new URL('/signin', request.url))
    response.cookies.delete('@xs:user')
    response.cookies.delete('@xs:token')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && current_user) {
    request.headers.set('Authorization', `Bearer ${current_token}`)
    return NextResponse.redirect(new URL('/', request.url))
  }
}
