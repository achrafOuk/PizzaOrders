import { NextResponse } from "next/server";
import Cookies from 'js-cookie'
export function middleware(request,response)
{
  // check if url is start with admin
  let isDashboardRoute =  request.nextUrl.pathname.startsWith('/admin');
  // check is user is authentificated
  let {cookies}= request;
  let host = request.headers.host
  console.log('////////////////////')
  console.log('cookies:',request.cookies )
  console.log('cookies:',request.headers.cookies )
  console.log('cookies:',Cookies.get('user_token') )
  console.log('////////////////////')
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
