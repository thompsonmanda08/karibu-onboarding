import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { AUTH_SESSION } from "./lib/constants";
import { decrypt } from "./lib/session";

const PROTECTED_ROUTES = [
  "/dashboard",
  // Add more protected routes as needed
];

const PUBLIC_ROUTE = ["/", "/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone(); // REQUIRED FOR BASE ABSOLUTE URL
  const response = NextResponse.next();

  // CHECK FOR PUBLIC AND PROTECTED ROUTES
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTE.includes(pathname);

  // DECRYPT COOKIE TO GET SESSION
  // const cookie = cookies().get(AUTH_SESSION)?.value;
  // const session = await decrypt(cookie);

  // IF PAGE IS PROTECTED AND THERE IS NO USER SESSION - REDIRECT TO LOGIN
  // if (isProtectedRoute && !session?.user) {
  //   url.pathname = "/auth/login";
  //   return NextResponse.redirect(url);
  // }

  // IF THERE IS AN ACTIVE USER SESSION - REDIRECT TO HOME
  // if (session?.user && pathname.startsWith("/auth")) {
  //   url.pathname = "/";

  //   return NextResponse.redirect(url);
  // }

  // if (isPublicRoute && session?.user && !pathname.startsWith("/dashboard")) {
  //   console.log("REDIRECTING TO DASHBOARD FROM: ", referer);
  //   console.log("REDIRECTING TO DASHBOARD FROM: ", url.pathname);

  //   url.pathname = "/dashboard";
  //   return NextResponse.redirect(url);
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
