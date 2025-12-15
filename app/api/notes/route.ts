import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { CreateNoteSchema } from "@/lib/schemas/notes";

export const POST = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);

    // ============================
    // PLAN RULES
    // ============================
    if (user.plan === "free") {
      // 🚫 no puede crear notas dentro de carpetas
      if (body.notebook_id) {
        return NextResponse.json(
          { message: "Upgrade required to use notebooks" },
          { status: 403 }
        );
      }

      // 🔢 límite de 3 notas sueltas
      const { count } = await supabase
        .from("notes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .is("notebook_id", null);

      if ((count ?? 0) >= 3) {
        return NextResponse.json(
          { message: "Free plan note limit reached" },
          { status: 403 }
        );
      }
    }

    // ============================
    // CALCULAR POSITION
    // ============================
    let query = supabase
      .from("notes")
      .select("position")
      .eq("user_id", user.id)
      .order("position", { ascending: false })
      .limit(1);

    if (body.notebook_id === null || body.notebook_id === undefined) {
      query = query.is("notebook_id", null);
    } else {
      query = query.eq("notebook_id", body.notebook_id);
    }

    const { data: last } = await query.maybeSingle();

    const nextPosition = (last?.position ?? -1) + 1;

    // ============================
    // CREATE NOTE
    // ============================
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        title: body.title,
        notebook_id: body.notebook_id ?? null,
        content: {},
        position: nextPosition,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  },
  {
    bodySchema: CreateNoteSchema,
  }
);

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { searchParams } = new URL(req.url);
  const notebookId = searchParams.get("notebook_id");

  let query = supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("position", { ascending: true });

  if (notebookId === "null") {
    query = query.is("notebook_id", null);
  } else if (notebookId) {
    query = query.eq("notebook_id", notebookId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
});
