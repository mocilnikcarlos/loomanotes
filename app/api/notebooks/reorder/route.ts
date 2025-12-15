import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { ReorderNotebooksSchema } from "@/lib/schemas/notebooks";

export const PATCH = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);

    for (const item of body.items) {
      const { error } = await supabase
        .from("notebooks")
        .update({ position: item.position })
        .eq("id", item.id)
        .eq("user_id", user.id);

      if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "reordered" });
  },
  {
    bodySchema: ReorderNotebooksSchema,
  }
);
