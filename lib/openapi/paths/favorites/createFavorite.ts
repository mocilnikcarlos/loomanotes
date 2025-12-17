import { registry } from "@/lib/openapi/registry";
import { FavoriteSchema, CreateFavoriteSchema } from "@/lib/schemas/favorites";

registry.registerPath({
  method: "post",
  path: "/favorites",
  tags: ["Favorites"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateFavoriteSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Nota marcada como favorita",
      content: {
        "application/json": {
          schema: FavoriteSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
