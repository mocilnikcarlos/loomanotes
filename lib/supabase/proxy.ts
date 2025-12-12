import { routes } from "@/utils/routes/route";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getUser } from "@/lib/services/users/getUser";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const pathname = request.nextUrl.pathname;

  // 🚫 Rutas a ignorar por el middleware
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    /\.\w+$/.test(pathname)
  ) {
    return response;
  }

  // Rutas que son explícitamente públicas
  const isPublic =
    pathname === routes.auth.login ||
    pathname === routes.auth.callback ||
    pathname === "/debug";

  if (isPublic) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  let authUser = null;
  let authError = null;

  try {
    const { data, error } = await supabase.auth.getUser();
    authUser = data?.user || null;
    authError = error;
  } catch (e) {
    console.log(
      "⚠️ MIDDLEWARE ERROR: Fallo al obtener el usuario de Supabase. Dejando pasar la solicitud.",
      e
    );
    return response;
  }

  if (!authUser && !authError) {
    const url = request.nextUrl.clone();
    url.pathname = routes.auth.login;
    return NextResponse.redirect(url);
  }

  if (authUser) {
    const dbUser = await getUser();
    const adminOnly = ["/swagger", "/debug", "/dashboard/admin"];

    if (adminOnly.includes(pathname)) {
      if (!dbUser || dbUser.role !== "admin") {
        console.log("⛔ Blocked admin route");
        const url = request.nextUrl.clone();
        url.pathname = routes.dashboard.root;
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}
