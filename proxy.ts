import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Exclusiones seguras
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api/auth") ||
    path.endsWith(".json") ||
    path.endsWith(".txt") ||
    path === "/error" ||
    path === "/not-found"
  ) {
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/swagger/:path*"],
};
