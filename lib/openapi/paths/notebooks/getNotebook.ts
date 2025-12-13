import { registry } from "@/lib/openapi/registry";
import {
  NotebookParamsSchema,
  NotebookDetailSchema,
} from "@/lib/schemas/notebooks";

registry.registerPath({
  method: "get",
  path: "/notebooks/{id}",
  tags: ["Notebooks"],
  request: {
    params: NotebookParamsSchema,
  },
  responses: {
    200: {
      description: "Notebook detail with notes",
      content: {
        "application/json": {
          schema: NotebookDetailSchema,
        },
      },
    },
    404: {
      description: "Notebook not found",
    },
  },
  security: [{ bearerAuth: [] }],
});
