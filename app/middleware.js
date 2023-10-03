import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("request :",request);
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard',
}