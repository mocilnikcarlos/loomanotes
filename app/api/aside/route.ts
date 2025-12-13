import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { data: notebooks } = await supabase
    .from("notebooks")
    .select("id, title, position")
    .eq("user_id", user.id)
    .order("position");

  const { data: notes } = await supabase
    .from("notes")
    .select("id, title, position, notebook_id")
    .eq("user_id", user.id)
    .order("position");

  const map = new Map<string | null, any[]>();

  for (const note of notes ?? []) {
    const key = note.notebook_id;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(note);
  }

  const result = [
    ...(notebooks ?? []).map((nb) => ({
      id: nb.id,
      title: nb.title,
      position: nb.position,
      notes: map.get(nb.id) ?? [],
    })),
    {
      id: "loose",
      title: "Sin notebook",
      position: 999,
      notes: map.get(null) ?? [],
    },
  ];

  return NextResponse.json(result);
});
