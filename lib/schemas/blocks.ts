import { z } from "@/lib/openapi/zod";

// =====================================================
// BLOCK BASE
// =====================================================
export const BlockTypeEnum = z
  .enum(["paragraph", "heading", "quote", "code_block", "image"])
  .openapi({
    example: "paragraph",
  });

export const BlockSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "d290f1ee-6c54-4b01-90e6-d701748f0851" }),
  note_id: z
    .string()
    .uuid()
    .openapi({ example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c" }),
  type: BlockTypeEnum.openapi({ example: "paragraph" }),
  content: z.record(z.string(), z.any()).openapi({
    example: {
      type: "paragraph",
      content: [{ type: "text", text: "Hola mundo" }],
    },
  }),
  position: z.number().int().min(0).openapi({ example: 0 }),
  created_at: z.string().openapi({ example: "2025-01-01T00:00:00Z" }),
  updated_at: z.string().openapi({ example: "2025-01-01T00:00:00Z" }),
});

// =====================================================
// CREATE
// =====================================================
export const CreateBlockSchema = z.object({
  note_id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
  type: BlockTypeEnum.openapi({ example: "paragraph" }),
  content: z.record(z.string(), z.any()).openapi({
    example: {
      type: "paragraph",
      content: [{ type: "text", text: "Nuevo contenido" }],
    },
  }),
});

// =====================================================
// UPDATE
// =====================================================
export const UpdateBlockSchema = z.object({
  type: BlockTypeEnum.optional().openapi({ example: "heading" }),
  content: z
    .record(z.string(), z.any())
    .optional()
    .openapi({
      example: {
        type: "paragraph",
        content: [{ type: "text", text: "Contenido editado" }],
      },
    }),
});

// =====================================================
// REORDER
// =====================================================
export const ReorderItemSchema = z.object({
  id: z.string().uuid(),
  position: z.number().int().min(0),
});

export const ReorderBlocksSchema = z.object({
  note_id: z.string().uuid(),
  items: z.array(ReorderItemSchema).min(1),
});

// (Opcionalmente exportamos los tipos inferidos para uso en el código)
export type CreateBlock = z.infer<typeof CreateBlockSchema>;
export type UpdateBlock = z.infer<typeof UpdateBlockSchema>;
export type ReorderBlocks = z.infer<typeof ReorderBlocksSchema>;
export type Block = z.infer<typeof BlockSchema>;
