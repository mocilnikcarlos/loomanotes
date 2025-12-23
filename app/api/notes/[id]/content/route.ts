import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { UpdateNoteContentSchema } from "@/lib/schemas/content";

export const PUT = withAuth(
  async ({ req, user, body, params }) => {
    const supabase = createRouteHandlerSupabase(req);
    const noteId = params.id;

    // ============================
    // CHECK OWNERSHIP
    // ============================
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("id")
      .eq("id", noteId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (noteError || !note) {
      return NextResponse.json(
        { message: "Note not found or no access" },
        { status: 404 }
      );
    }

    // ============================
    // UPDATE CONTENT
    // ============================
    const { error } = await supabase
      .from("notes")
      .update({
        content: body.content,
      })
      .eq("id", noteId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "content_saved" });
  },
  {
    bodySchema: UpdateNoteContentSchema,
  }
);
