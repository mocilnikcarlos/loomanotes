import { z } from "@/lib/openapi/zod";

export const TiptapNodeSchema: z.ZodType<any> = z
  .lazy(() =>
    z.object({
      type: z.string().openapi({ example: "paragraph" }),
      attrs: z.record(z.string(), z.any()).optional(),
      content: z.array(TiptapNodeSchema).optional(),
      text: z.string().optional().openapi({ example: "Hola mundo" }),
      marks: z
        .array(
          z.object({
            type: z.string().openapi({ example: "bold" }),
            attrs: z.record(z.string(), z.any()).optional(),
          })
        )
        .optional(),
    })
  )
  .openapi({
    type: "object",
    description: "Recursive Tiptap node",
  });

export const TiptapDocSchema = z.object({
  type: z.literal("doc"),
  content: z.array(TiptapNodeSchema).min(1),
});

export const UpdateNoteContentSchema = z.object({
  content: TiptapDocSchema.openapi({
    description:
      "Tiptap editor document JSON. Full document snapshot sent on each change.",
  }),
});

export type UpdateNoteContent = z.infer<typeof UpdateNoteContentSchema>;
