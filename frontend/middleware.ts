import { NextResponse } from 'next/server'

export async function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|manifest.webmanifest|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg$).*)',
  ],
}
