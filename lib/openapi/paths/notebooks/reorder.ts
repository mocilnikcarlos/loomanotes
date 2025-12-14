import { registry } from "@/lib/openapi/registry";
import { ReorderNotebooksSchema } from "@/lib/schemas/notebooks";
import { z } from "@/lib/openapi/zod";

registry.registerPath({
  method: "patch",
  path: "/notebooks/reorder",
  tags: ["Notebooks"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReorderNotebooksSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Notebooks reordered",
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
