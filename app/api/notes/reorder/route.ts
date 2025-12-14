import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { ReorderNotesSchema } from "@/lib/schemas/notes";

export const PATCH = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);

    for (const item of body.items) {
      const { error } = await supabase
        .from("notes")
        .update({
          position: item.position,
          notebook_id: body.notebook_id,
        })
        .eq("id", item.id)
        .eq("user_id", user.id);

      if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "reordered" });
  },
  {
    bodySchema: ReorderNotesSchema,
  }
);
