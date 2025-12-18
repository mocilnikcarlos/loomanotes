import { registry } from "@/lib/openapi/registry";
import { ReorderBlocksSchema } from "@/lib/schemas/blocks";

registry.registerPath({
  method: "patch",
  path: "/blocks/reorder",
  tags: ["Blocks"],
  summary: "Reordenar bloques de una nota",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ReorderBlocksSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Bloques reordenados",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "reordered" },
            },
          },
        },
      },
    },
    400: { description: "Error al reordenar" },
  },
  security: [{ bearerAuth: [] }],
});
