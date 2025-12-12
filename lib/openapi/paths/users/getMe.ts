import { registry } from "@/lib/openapi/registry";
import { UserResponseSchema } from "@/lib/schemas/user";

registry.registerPath({
  method: "get",
  path: "/users/me",
  tags: ["Users"],
  responses: {
    200: {
      description: "Usuario autenticado",
      content: {
        "application/json": { schema: UserResponseSchema },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
