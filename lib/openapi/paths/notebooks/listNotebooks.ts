import { registry } from "@/lib/openapi/registry";
import { ListNotebooksResponseSchema } from "@/lib/schemas/notebooks";

registry.registerPath({
  method: "get",
  path: "/notebooks",
  tags: ["Notebooks"],
  responses: {
    200: {
      description: "List of notebooks",
      content: {
        "application/json": {
          schema: ListNotebooksResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
