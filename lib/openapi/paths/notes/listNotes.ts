import { registry } from "@/lib/openapi/registry";
import { ListNotesResponseSchema } from "@/lib/schemas/notes";
import { z } from "@/lib/openapi/zod";

registry.registerPath({
  method: "get",
  path: "/notes",
  tags: ["Notes"],
  request: {
    query: z.object({
      notebook_id: z.string().uuid().nullable().optional().openapi({
        example: null,
        description: "Filtrar por notebook. Usar null para notas sueltas.",
      }),
    }),
  },
  responses: {
    200: {
      description: "List of notes",
      content: {
        "application/json": {
          schema: ListNotesResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
