import { registry } from "@/lib/openapi/registry";
import { CreateNoteSchema, NoteSchema } from "@/lib/schemas/notes";

registry.registerPath({
  method: "post",
  path: "/notes",
  tags: ["Notes"],
  request: {
    body: {
      content: {
        "application/json": { schema: CreateNoteSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Note created",
      content: {
        "application/json": { schema: NoteSchema },
      },
    },
    403: { description: "Plan restriction" },
  },
  security: [{ bearerAuth: [] }],
});
