// lib/openapi/paths/admin/updateUser.ts
import { registry } from "@/lib/openapi/registry";
import {
  AdminUpdateUserSchema,
  UpdateUserParamsSchema,
} from "@/lib/schemas/admin";
import { UserResponseSchema } from "@/lib/schemas/user";

registry.registerPath({
  method: "patch",
  path: "/admin/users/{id}",
  tags: ["Admin"],
  request: {
    params: UpdateUserParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: AdminUpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Usuario actualizado",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
