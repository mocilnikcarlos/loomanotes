import { registry } from "@/lib/openapi/registry";
import { CreateBlockSchema, BlockSchema } from "@/lib/schemas/blocks";

registry.registerPath({
  method: "post",
  path: "/blocks",
  tags: ["Blocks"],
  summary: "Crear un nuevo bloque en una nota",
  request: {
    body: {
      content: {
        "application/json": { schema: CreateBlockSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Bloque creado",
      content: {
        "application/json": {
          schema: BlockSchema,
        },
      },
    },
    400: { description: "Error de validación o Supabase" },
    404: { description: "Nota no encontrada o sin acceso" },
  },
  security: [{ bearerAuth: [] }],
});
