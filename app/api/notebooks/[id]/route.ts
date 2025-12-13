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
