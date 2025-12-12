import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getUser } from "@/lib/services/users/getUser";
import { routes } from "@/utils/routes/route";

const PUBLIC_ROUTES = [routes.auth.login, routes.auth.callback];

const ADMIN_ROUTES = [
  "/dashboard/admin",
  "/dashboard/admin/*",
  "/swagger",
  "/swagger/*",
  "/debug",
  "/debug/*",
];

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Ignorar assets internos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    /\.\w+$/.test(pathname)
  ) {
    return response;
  }

  // Público real
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return response;
  }

  // Auth Supabase SSR
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const authUser = data?.user;

  if (!authUser) {
    const url = request.nextUrl.clone();
    url.pathname = "auth/callback";
    return NextResponse.redirect(url);
  }

  const dbUser = await getUser(); // { role: "user" | "admin" }

  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (dbUser?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
