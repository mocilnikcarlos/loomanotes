import { registry } from "@/lib/openapi/registry";
import { z } from "zod";

registry.registerPath({
  method: "delete",
  path: "/blocks/{id}",
  tags: ["Blocks"],
  summary: "Eliminar un bloque",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Bloque eliminado",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "deleted" },
            },
          },
        },
      },
    },
    400: { description: "Error al eliminar" },
  },
  security: [{ bearerAuth: [] }],
});
