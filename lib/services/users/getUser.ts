import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { UserResponse } from "@/lib/schemas/user";

export async function getUser(): Promise<UserResponse | null> {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 1. Obtener auth
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return null;

  // 2. Obtener datos del user en tu tabla
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", auth.user.id)
    .single();

  return data as UserResponse;
}
