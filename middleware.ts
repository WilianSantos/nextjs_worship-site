import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get('access_token')?.value
  const isAuthenticated = !!accessToken

  const isPublicRoute =
    pathname.endsWith('/login') ||
    pathname.endsWith('/register') ||
    pathname.endsWith('/logins')
  const isPrivateRoute =
    pathname.includes('/') ||
    pathname.includes('/categories') ||
    pathname.includes('/functions') ||
    pathname.includes('/members') ||
    pathname.includes('/musics') ||
    pathname.includes('/playlists') ||
    pathname.includes('/profile') ||
    pathname.includes('/scales')

  if (isPrivateRoute && !isAuthenticated) {
    alert('Não autenticado.')
    return NextResponse.redirect(new URL(`/logins`, request.url))
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }

  return NextResponse.next()
}
