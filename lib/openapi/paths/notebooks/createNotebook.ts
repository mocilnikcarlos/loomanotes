import { registry } from "@/lib/openapi/registry";
import { CreateNotebookSchema, NotebookSchema } from "@/lib/schemas/notebooks";

registry.registerPath({
  method: "post",
  path: "/notebooks",
  tags: ["Notebooks"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateNotebookSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Notebook created",
      content: {
        "application/json": {
          schema: NotebookSchema,
        },
      },
    },
    403: { description: "Plan restriction" },
  },
  security: [{ bearerAuth: [] }],
});
