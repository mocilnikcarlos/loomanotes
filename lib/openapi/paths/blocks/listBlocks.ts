import { registry } from "@/lib/openapi/registry";
import { BlockSchema } from "@/lib/schemas/blocks";
import { z } from "zod";

registry.registerPath({
  method: "get",
  path: "/blocks",
  tags: ["Blocks"],
  summary: "Listar bloques de una nota",
  request: {
    query: z.object({
      note_id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Bloques de la nota",
      content: {
        "application/json": {
          schema: z.array(BlockSchema),
        },
      },
    },
    400: { description: "Falta note_id o error de consulta" },
  },
  security: [{ bearerAuth: [] }],
});
