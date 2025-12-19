import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/withAuth";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { z } from "@/lib/openapi/zod";
import { CreateBlockSchema } from "@/lib/schemas/blocks";

const BulkBlocksSchema = z.object({
  note_id: z.string().uuid(),
  blocks: z.array(CreateBlockSchema),
});

export const POST = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);
    const { note_id, blocks } = body;

    // 1️⃣ borrar bloques existentes de la nota
    const { error: deleteError } = await supabase
      .from("blocks")
      .delete()
      .eq("note_id", note_id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json(
        { message: deleteError.message },
        { status: 400 }
      );
    }

    // 2️⃣ insertar nuevos bloques con posición
    const payload = blocks.map((block, index) => ({
      ...block,
      user_id: user.id,
      position: index,
    }));

    const { error: insertError } = await supabase
      .from("blocks")
      .insert(payload);

    if (insertError) {
      return NextResponse.json(
        { message: insertError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "saved" });
  },
  { bodySchema: BulkBlocksSchema }
);
