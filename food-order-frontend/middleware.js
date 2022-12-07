import { NextResponse } from "next/server";
export function middleware(request,response)
{
  let {cookies}= request;
  // check if url is start with admin
  let isDashboardRoute =  request.nextUrl.pathname.startsWith('/admin');
  // check is user is authentificated
  let isUserAuth = cookies.get('access_token') !== undefined ? true: false;
  if( isDashboardRoute && isUserAuth ) 
  { 
    return NextResponse.next();
  }
  else if(  isDashboardRoute && !isUserAuth) 
  {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if( !isDashboardRoute && !isUserAuth) 
  {
    return NextResponse.next();
  }
  else if( !isDashboardRoute && isUserAuth) 
  {
      return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next();
}
// define the routes where the middleware is applied
export const config = {
  matcher: ['/','/pizza/:path*','/admin/:path*','/login','/cart']
}