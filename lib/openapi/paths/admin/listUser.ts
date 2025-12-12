// lib/openapi/paths/admin/listUsers.ts
import { registry } from "@/lib/openapi/registry";
import { AdminListUsersResponseSchema } from "@/lib/schemas/admin";

registry.registerPath({
  method: "get",
  path: "/admin/users",
  tags: ["Admin"],
  responses: {
    200: {
      description: "Lista de usuarios",
      content: {
        "application/json": {
          schema: AdminListUsersResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
