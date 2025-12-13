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
      // no notebooks
      if (body.notebook_id) {
        return NextResponse.json(
          { message: "Upgrade required to use notebooks" },
          { status: 403 }
        );
      }

      // max 3 loose notes
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
    // CREATE NOTE
    // ============================
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        title: body.title,
        notebook_id: body.notebook_id ?? null,
        content: {},
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
