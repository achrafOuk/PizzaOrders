import { NextResponse } from "next/server";
export function middleware(request,response)
{
  // check if url is start with admin
  let isDashboardRoute =  request.nextUrl.pathname.startsWith('/admin');
  // check is user is authentificated
  let {cookies}= request;
  let isUserAuth =  cookies?.get('access_token')?.length > 50 ?? false;
  //console.log( cookies.get('access_token').length > 50   );
  //console.log('is auth',cookies.get('access_token') ,typeof( cookies.get('access_token') ),isUserAuth)
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
  matcher: ['/','/fellow-order/:path*','/pizza/:path*','/admin/:path*','/login','/cart','/checkout']
}

