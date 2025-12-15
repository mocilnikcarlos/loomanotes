import { registry } from "@/lib/openapi/registry";
import { NoteSchema } from "@/lib/schemas/notes";
import { NoteParamsSchema } from "@/lib/schemas/notes";

registry.registerPath({
  method: "get",
  path: "/notes/{id}",
  tags: ["Notes"],
  request: {
    params: NoteParamsSchema,
  },
  responses: {
    200: {
      description: "Note detail",
      content: {
        "application/json": {
          schema: NoteSchema,
        },
      },
    },
    404: {
      description: "Note not found",
    },
  },
  security: [{ bearerAuth: [] }],
});
