import { registry } from "@/lib/openapi/registry";
import { AsideResponseSchema } from "@/lib/schemas/aside";

registry.registerPath({
  method: "get",
  path: "/aside",
  tags: ["Navigation"],
  responses: {
    200: {
      description: "Sidebar structure (notebooks + notes)",
      content: {
        "application/json": {
          schema: AsideResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
