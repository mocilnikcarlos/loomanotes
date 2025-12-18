// app/api/blocks/reorder/route.ts
import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { ReorderBlocksSchema } from "@/lib/schemas/blocks";

export const PATCH = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);
    const { note_id, items } = body;

    for (const item of items) {
      const { error } = await supabase
        .from("blocks")
        .update({
          position: item.position,
          note_id: note_id,
        })
        .eq("id", item.id)
        .eq("user_id", user.id);

      if (error) {
        // Si ocurre un error en alguno, cancelamos y devolvemos el error
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "reordered" });
  },
  {
    bodySchema: ReorderBlocksSchema,
  }
);
