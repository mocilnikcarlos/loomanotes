import { registry } from "@/lib/openapi/registry";
import { UpdateBlockSchema } from "@/lib/schemas/blocks";
import { z } from "zod";

registry.registerPath({
  method: "patch",
  path: "/blocks/{id}",
  tags: ["Blocks"],
  summary: "Actualizar tipo o contenido de un bloque",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateBlockSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Bloque actualizado",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "updated" },
            },
          },
        },
      },
    },
    400: { description: "Error al actualizar" },
  },
  security: [{ bearerAuth: [] }],
});
