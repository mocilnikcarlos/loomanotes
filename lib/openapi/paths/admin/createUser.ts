import { registry } from "@/lib/openapi/registry";
import { AdminCreateUserSchema } from "@/lib/schemas/admin";
import { UserResponseSchema } from "@/lib/schemas/user";
import { z } from "@/lib/openapi/zod";

registry.registerPath({
  method: "post",
  path: "/admin/users/create",
  tags: ["Admin"],
  request: {
    body: {
      content: {
        "application/json": { schema: AdminCreateUserSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Usuario creado",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "User created successfully",
            }),
            user: UserResponseSchema,
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
