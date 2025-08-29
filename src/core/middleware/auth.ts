import { UserSession } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const session = request.cookies.get("clb-session")?.value;

  const { nextUrl } = request;

  const signinRoute = request.nextUrl.clone();

  const authRoutes = ["/signin" , "/verify"];
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const protectedRoutes = ["/student"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    signinRoute.pathname = "/signin";
    return NextResponse.redirect(`${signinRoute}?callbackUrl=${callbackUrl}`);
  }

  if(session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
