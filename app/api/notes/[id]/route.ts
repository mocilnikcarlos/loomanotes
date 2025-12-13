import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { UpdateNoteSchema } from "@/lib/schemas/notes";

export const PATCH = withAuth(
  async ({ req, user, body, params }) => {
    const supabase = createRouteHandlerSupabase(req);

    // FREE cannot move to notebook
    if (user.plan === "free" && body.notebook_id) {
      return NextResponse.json(
        { message: "Upgrade required to use notebooks" },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from("notes")
      .update(body)
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "updated" });
  },
  {
    bodySchema: UpdateNoteSchema,
  }
);

export const DELETE = withAuth(async ({ req, params }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { error } = await supabase.from("notes").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "deleted" });
});
