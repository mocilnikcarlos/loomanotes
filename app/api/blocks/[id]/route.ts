// app/api/blocks/[id]/route.ts
import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { UpdateBlockSchema } from "@/lib/schemas/blocks";

export const PATCH = withAuth(
  async ({ req, user, body, params }) => {
    const supabase = createRouteHandlerSupabase(req);
    const blockId = params.id;

    const { error } = await supabase
      .from("blocks")
      .update(body)
      .eq("id", blockId)
      .eq("user_id", user.id); // Filtramos por usuario para mayor seguridad

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "updated" });
  },
  {
    bodySchema: UpdateBlockSchema,
  }
);

export const DELETE = withAuth(async ({ req, params }) => {
  const supabase = createRouteHandlerSupabase(req);
  const blockId = params.id;

  const { error } = await supabase.from("blocks").delete().eq("id", blockId);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "deleted" });
});
