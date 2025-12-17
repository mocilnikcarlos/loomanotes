import { registry } from "@/lib/openapi/registry";
import { ListFavoritesResponseSchema } from "@/lib/schemas/favorites";

registry.registerPath({
  method: "get",
  path: "/favorites",
  tags: ["Favorites"],
  responses: {
    200: {
      description: "Listado de favoritos del usuario",
      content: {
        "application/json": {
          schema: ListFavoritesResponseSchema,
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
