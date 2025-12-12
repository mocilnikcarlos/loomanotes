import { registry } from "@/lib/openapi/registry";
import { UserUpdateSchema, UserResponseSchema } from "@/lib/schemas/user";

registry.registerPath({
  method: "patch",
  path: "/users/me",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": { schema: UserUpdateSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Usuario actualizado",
      content: {
        "application/json": { schema: UserResponseSchema },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
