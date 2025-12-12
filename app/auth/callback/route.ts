import { createServerClient } from "@supabase/ssr";
import { routes } from "@/utils/routes/route";
import { NextRequest, NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl: URL = new URL(request.url);
  const code: string | null = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL(routes.auth.login, requestUrl.origin));
  }

  const redirectTo: URL = new URL(routes.dashboard.root, requestUrl.origin);
  const response: NextResponse = NextResponse.redirect(redirectTo);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll(): { name: string; value: string }[] {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ): void {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Supabase error during callback:", error);
    return NextResponse.redirect(new URL(routes.auth.login, requestUrl.origin));
  }

  return response;
}
