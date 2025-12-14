import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { UpdateNotebookSchema } from "@/lib/schemas/notebooks";

export const PATCH = withAuth(
  async ({ req, body, params }) => {
    const supabase = createRouteHandlerSupabase(req);

    const { error } = await supabase
      .from("notebooks")
      .update({ title: body.title })
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "updated" });
  },
  {
    bodySchema: UpdateNotebookSchema,
  }
);

export const DELETE = withAuth(async ({ req, params }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { error } = await supabase
    .from("notebooks")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "deleted" });
});

export const GET = withAuth(async ({ req, user, params }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { data: notebook, error: notebookError } = await supabase
    .from("notebooks")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (notebookError || !notebook) {
    return NextResponse.json(
      { message: "Notebook not found" },
      { status: 404 }
    );
  }

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .eq("notebook_id", params.id)
    .order("updated_at", { ascending: false });

  if (notesError) {
    return NextResponse.json({ message: notesError.message }, { status: 400 });
  }

  return NextResponse.json({
    notebook,
    notes,
  });
});
