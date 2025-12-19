import { registry } from "@/lib/openapi/registry";
import { NoteParamsSchema, UpdateNoteContentSchema } from "@/lib/schemas/notes";
import { z } from "@/lib/openapi/zod";

const UpdateNoteContentResponseSchema = z.object({
  message: z.literal("content_saved"),
});

registry.registerPath({
  method: "put",
  path: "/notes/{id}/content",
  tags: ["Notes"],
  request: {
    params: NoteParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateNoteContentSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Note content updated",
      content: {
        "application/json": {
          schema: UpdateNoteContentResponseSchema,
        },
      },
    },
    401: { description: "Unauthorized" },
    404: { description: "Note not found or no access" },
  },
  security: [{ bearerAuth: [] }],
});
