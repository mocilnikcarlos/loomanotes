import { registry } from "@/lib/openapi/registry";
import {
  UpdateNotebookSchema,
  NotebookSchema,
  NotebookParamsSchema,
} from "@/lib/schemas/notebooks";

registry.registerPath({
  method: "patch",
  path: "/notebooks/{id}",
  tags: ["Notebooks"],
  request: {
    params: NotebookParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateNotebookSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Notebook updated",
      content: {
        "application/json": {
          schema: NotebookSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
