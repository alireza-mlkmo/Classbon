import { NextRequest } from "next/server";
import { authMiddleware } from "./core/middleware/auth";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/student", "/signin" , "/verify"],
};
