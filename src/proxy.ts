import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const protectedRoute = ["/cart", "/whislist"];
  const authProdeted = ["/login", "/register"];
  const myPath = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const myToken = token?.returnedToken;

  if (!myToken && protectedRoute.some((path) =>myPath.startsWith(path) )) {
console.log("nooooooo")
      return NextResponse.redirect(new URL('/login', request.nextUrl))

  }
  if (myToken&&authProdeted.some((path) => myPath.startsWith(path))) {

      return NextResponse.redirect(new URL('/', request.nextUrl))

  }

  // console.log("requestPathName",request.nextUrl.pathname);

  return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/cart/:path*','/whislist/:path*','/login/:path*','/register/:path*',]
}
