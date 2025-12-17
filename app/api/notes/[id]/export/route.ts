import { NextResponse } from "next/server";
import JSZip from "jszip";
import slugify from "slugify";
import { withAuth } from "@/lib/api/withAuth";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { NoteExportSchema } from "@/lib/schemas/export/noteExport";

export const GET = withAuth(async ({ req, user, params }) => {
  const supabase = createRouteHandlerSupabase(req);
  const noteId = params.id;

  // 1️⃣ Fetch note (RLS manda)
  const { data: note, error } = await supabase
    .from("notes")
    .select("id, title, content, created_at, updated_at")
    .eq("id", noteId)
    .single();

  if (error || !note) {
    return NextResponse.json({ message: "Note not found" }, { status: 404 });
  }

  // 2️⃣ Build metadata (schema manda)
  const noteExport = NoteExportSchema.parse({
    export_version: 1,
    note_id: note.id,
    title: note.title,
    created_at: new Date(note.created_at).toISOString(),
    updated_at: new Date(note.updated_at).toISOString(),
    content_format: "text",
  });

  // 3️⃣ ZIP
  const zip = new JSZip();
  const folder = zip.folder("loomanote-export")!;

  folder.file("note.json", JSON.stringify(noteExport, null, 2));

  const content =
    typeof note.content === "string"
      ? note.content
      : JSON.stringify(note.content ?? {}, null, 2);

  folder.file("content.txt", content);

  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  const body = new Uint8Array(buffer);

  // 4️⃣ Response download
  const filename = `loomanote-${slugify(note.title, {
    lower: true,
    strict: true,
  })}.zip`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});
