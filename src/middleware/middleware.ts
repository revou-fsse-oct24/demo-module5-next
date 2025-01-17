import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth-token");

  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/photos")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/photos", "/photos/:path*"],
};
