// app/api/blocks/route.ts
import { withAuth } from "@/lib/api/withAuth";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { CreateBlockSchema } from "@/lib/schemas/blocks";

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);
  const noteId = req.nextUrl.searchParams.get("note_id");

  // Validar que se provea note_id
  if (!noteId) {
    return NextResponse.json({ message: "Missing note_id" }, { status: 400 });
  }

  // Obtener bloques de la nota indicada, ordenados por posición
  const { data, error } = await supabase
    .from("blocks")
    .select("*")
    .eq("note_id", noteId)
    .eq("user_id", user.id) // Se asegura de filtrar por el usuario actual
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  // Si no hay bloques (data puede ser []), igualmente devolvemos el array vacío
  return NextResponse.json(data);
});

export const POST = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);
    const { note_id, type, content } = body;

    // (Opcional) Verificar que la nota existe y pertenece al usuario
    const { data: noteCheck, error: noteError } = await supabase
      .from("notes")
      .select("id")
      .eq("id", note_id)
      .eq("user_id", user.id)
      .maybeSingle();
    if (noteError || !noteCheck) {
      return NextResponse.json(
        { message: "Nota no encontrada o sin acceso" },
        { status: 404 }
      );
    }

    // ============================
    // CALCULAR POSICIÓN
    // ============================
    const { data: lastBlock } = await supabase
      .from("blocks")
      .select("position")
      .eq("note_id", note_id)
      .eq("user_id", user.id)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextPosition = (lastBlock?.position ?? -1) + 1;

    // ============================
    // CREAR BLOQUE
    // ============================
    const { data, error } = await supabase
      .from("blocks")
      .insert({
        user_id: user.id,
        note_id: note_id,
        type: type,
        content: content,
        position: nextPosition,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Se devuelve el bloque creado (incluyendo su id generado y timestamps)
    return NextResponse.json(data, { status: 201 });
  },
  {
    bodySchema: CreateBlockSchema,
  }
);
