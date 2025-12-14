import { registry } from "@/lib/openapi/registry";
import { NotebookParamsSchema } from "@/lib/schemas/notebooks";
import { z } from "@/lib/openapi/zod";

registry.registerPath({
  method: "delete",
  path: "/notebooks/{id}",
  tags: ["Notebooks"],
  request: {
    params: NotebookParamsSchema,
  },
  responses: {
    200: {
      description: "Notebook deleted",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "deleted",
            }),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
