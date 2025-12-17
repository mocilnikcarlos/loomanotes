import { z } from "@/lib/openapi/zod";

// ===============================
// NOTE EXPORT METADATA (v1)
// ===============================
export const NoteExportSchema = z.object({
  export_version: z.literal(1).openapi({
    example: 1,
  }),

  note_id: z.string().uuid().openapi({
    example: "b2f1c7d4-8f2b-4baf-9c52-123456789abc",
  }),

  title: z.string().openapi({
    example: "Mi nota importante",
  }),

  created_at: z.string().openapi({
    example: "2024-01-01T00:00:00Z",
  }),

  updated_at: z.string().openapi({
    example: "2024-01-02T00:00:00Z",
  }),

  content_format: z.literal("text").openapi({
    example: "text",
  }),
});

export type NoteExport = z.infer<typeof NoteExportSchema>;
