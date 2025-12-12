import { registry } from "@/lib/openapi/registry";

registry.registerPath({
  method: "delete",
  path: "/users/me",
  tags: ["Users"],
  responses: {
    200: {
      description: "Usuario eliminado",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "deleted",
              },
            },
          },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
