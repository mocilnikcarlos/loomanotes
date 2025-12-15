import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { CreateNotebookSchema } from "@/lib/schemas/notebooks";

export const POST = withAuth(
  async ({ req, user, body }) => {
    if (user.plan !== "premium") {
      return NextResponse.json(
        { message: "Upgrade required to create notebooks" },
        { status: 403 }
      );
    }

    const supabase = createRouteHandlerSupabase(req);

    // ============================
    // CALCULAR POSITION
    // ============================
    const { data: last } = await supabase
      .from("notebooks")
      .select("position")
      .eq("user_id", user.id)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextPosition = (last?.position ?? -1) + 1;

    // ============================
    // CREATE NOTEBOOK
    // ============================
    const { data, error } = await supabase
      .from("notebooks")
      .insert({
        user_id: user.id,
        title: body.title,
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
    bodySchema: CreateNotebookSchema,
  }
);

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { data, error } = await supabase
    .from("notebooks")
    .select("*")
    .eq("user_id", user.id)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
});
