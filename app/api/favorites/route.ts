import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/withAuth";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { CreateFavoriteSchema } from "@/lib/schemas/favorites";

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { data, error } = await supabase
    .from("favorites")
    .select("id, entity_type, entity_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
});

export const POST = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);

    const { entity_type, entity_id } = body;

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        entity_type,
        entity_id,
      })
      .select()
      .single();

    if (error) {
      // conflicto por índice único → ya es favorito
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Already favorited" },
          { status: 200 }
        );
      }

      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  },
  {
    bodySchema: CreateFavoriteSchema,
  }
);

export const DELETE = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { searchParams } = new URL(req.url);
  const entity_type = searchParams.get("entity_type");
  const entity_id = searchParams.get("entity_id");

  if (!entity_type || !entity_id) {
    return NextResponse.json(
      { message: "Missing entity_type or entity_id" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("entity_type", entity_type)
    .eq("entity_id", entity_id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
});
