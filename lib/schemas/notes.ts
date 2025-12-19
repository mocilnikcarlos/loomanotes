import { z } from "@/lib/openapi/zod";

// =====================================================
// NOTE BASE
// =====================================================
export const NoteSchema = z.object({
  id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
  title: z.string().openapi({ example: "Mi primera nota" }),
  content: z.any().openapi({ example: {} }),
  notebook_id: z.string().uuid().nullable().openapi({
    example: null,
  }),
  created_at: z.string().openapi({ example: "2024-01-01T00:00:00Z" }),
  updated_at: z.string().openapi({ example: "2024-01-01T00:00:00Z" }),
});

export const NoteParamsSchema = z.object({
  id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
});

export const ListNotesResponseSchema = z.array(NoteSchema);

// =====================================================
// CREATE NOTE
// =====================================================
export const CreateNoteSchema = z.object({
  title: z.string().min(1).openapi({
    example: "Nueva nota",
  }),
  notebook_id: z.string().uuid().nullable().optional().openapi({
    example: null,
  }),
});

export const UpdateNoteSchema = z.object({
  title: z.string().min(1).optional().openapi({
    example: "Título actualizado",
  }),
  notebook_id: z.string().uuid().nullable().optional().openapi({
    example: "8cdddc81-2042-4f08-a910-e6c1627cef30",
  }),
});

export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type UpdateNote = z.infer<typeof UpdateNoteSchema>;

// =====================================================
// REORDER
// =====================================================
export const ReorderItemSchema = z.object({
  id: z.string().uuid(),
  position: z.number().int().min(0),
});

export const ReorderNotesSchema = z.object({
  notebook_id: z.string().uuid().nullable(), // null = loose notes
  items: z.array(ReorderItemSchema).min(1),
});

export type ReorderNotes = z.infer<typeof ReorderNotesSchema>;

// =====================================================
// UPDATE NOTE CONTENT (BlockNote)
// =====================================================
export const UpdateNoteContentSchema = z.object({
  content: z.any().openapi({
    example: [],
    description:
      "BlockNote editor.document JSON. Full document snapshot sent on each change.",
  }),
});

export type UpdateNoteContent = z.infer<typeof UpdateNoteContentSchema>;
