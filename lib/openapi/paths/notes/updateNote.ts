import { registry } from "@/lib/openapi/registry";
import {
  UpdateNoteSchema,
  NoteSchema,
  NoteParamsSchema,
} from "@/lib/schemas/notes";

registry.registerPath({
  method: "patch",
  path: "/notes/{id}",
  tags: ["Notes"],
  request: {
    params: NoteParamsSchema, // ✅ SOLO id
    body: {
      content: {
        "application/json": {
          schema: UpdateNoteSchema, // ✅ title / notebook_id
        },
      },
    },
  },
  responses: {
    200: {
      description: "Note updated",
      content: {
        "application/json": {
          schema: NoteSchema,
        },
      },
    },
    403: { description: "Plan restriction" },
    404: { description: "Note not found" },
  },
  security: [{ bearerAuth: [] }],
});
