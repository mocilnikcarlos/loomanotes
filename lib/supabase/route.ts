import { createServerClient, type CookieOptions } from "@supabase/ssr";

export function createRouteHandlerSupabase(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";

  // ← ahora sí, const porque no reasignamos la variable.
  const newCookies: { name: string; value: string; options: CookieOptions }[] =
    [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) {
          const match = cookieHeader
            .split(";")
            .map((v) => v.trim())
            .find((v) => v.startsWith(name + "="));

          return match ? match.split("=")[1] : undefined;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Registramos la cookie por si querés usarla después,
          // pero NO la enviamos porque los route handlers no soportan set-cookie directo.
          newCookies.push({ name, value, options });
        },
        remove(name: string, options: CookieOptions) {
          newCookies.push({ name, value: "", options });
        },
      },
    }
  );

  return supabase;
}
