import { registry } from "@/lib/openapi/registry";
import { ReorderNotesSchema } from "@/lib/schemas/notes";
import { z } from "@/lib/openapi/zod";

registry.registerPath({
  method: "patch",
  path: "/notes/reorder",
  tags: ["Notes"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReorderNotesSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Notes reordered",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
