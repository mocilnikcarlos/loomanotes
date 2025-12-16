// lib/services/notes/getNotes.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { ListNotesResponseSchema } from "@/lib/schemas/notes";

type GetNotesParams = {
  notebook_id?: string | null;
};

export async function getNotes(params?: GetNotesParams) {
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

  let query = supabase.from("notes").select("*").order("created_at", {
    ascending: true,
  });

  if (params?.notebook_id === null) {
    query = query.is("notebook_id", null);
  }

  if (typeof params?.notebook_id === "string") {
    query = query.eq("notebook_id", params.notebook_id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`getNotes error: ${error.message}`);
  }

  return ListNotesResponseSchema.parse(data);
}
