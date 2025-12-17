import { registry } from "@/lib/openapi/registry";
import { DeleteFavoriteParamsSchema } from "@/lib/schemas/favorites";

registry.registerPath({
  method: "delete",
  path: "/favorites",
  tags: ["Favorites"],
  request: {
    query: DeleteFavoriteParamsSchema,
  },
  responses: {
    200: {
      description: "Favorito eliminado",
    },
  },
  security: [{ bearerAuth: [] }],
});
