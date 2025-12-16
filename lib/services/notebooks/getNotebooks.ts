// lib/services/notebooks/getNotebooks.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { ListNotebooksResponseSchema } from "@/lib/schemas/notebooks";

export async function getNotebooks() {
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

  const { data, error } = await supabase
    .from("notebooks")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`getNotebooks error: ${error.message}`);
  }

  return ListNotebooksResponseSchema.parse(data);
}
