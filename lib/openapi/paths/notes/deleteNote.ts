import { registry } from "@/lib/openapi/registry";
import { NoteSchema } from "@/lib/schemas/notes";

registry.registerPath({
  method: "delete",
  path: "/notes/{id}",
  tags: ["Notes"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
        example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
      },
    },
  ],
  responses: {
    200: {
      description: "Note deleted",
      content: {
        "application/json": { schema: NoteSchema },
      },
    },
    404: { description: "Note not found" },
  },
  security: [{ bearerAuth: [] }],
});
