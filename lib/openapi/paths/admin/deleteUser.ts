// lib/openapi/paths/admin/deleteUser.ts
import { registry } from "@/lib/openapi/registry";
import {
  DeleteUserParamsSchema,
  DeleteUserResponseSchema,
} from "@/lib/schemas/admin";

registry.registerPath({
  method: "delete",
  path: "/admin/users/{id}",
  tags: ["Admin"],
  request: {
    params: DeleteUserParamsSchema,
  },
  responses: {
    200: {
      description: "Usuario eliminado",
      content: {
        "application/json": { schema: DeleteUserResponseSchema },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
