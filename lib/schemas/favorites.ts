import { z } from "@/lib/openapi/zod";

// =====================================================
// FAVORITE BASE
// =====================================================
export const FavoriteSchema = z.object({
  id: z.string().uuid().openapi({
    example: "b2f1c7d4-8f2b-4baf-9c52-123456789abc",
  }),
  entity_type: z.literal("note").openapi({
    example: "note",
  }),
  entity_id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
  created_at: z.string().openapi({
    example: "2024-01-01T00:00:00Z",
  }),
});

export const ListFavoritesResponseSchema = z.array(FavoriteSchema);

// =====================================================
// CREATE FAVORITE
// =====================================================
export const CreateFavoriteSchema = z.object({
  entity_type: z.literal("note").openapi({
    example: "note",
  }),
  entity_id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
});

export type CreateFavorite = z.infer<typeof CreateFavoriteSchema>;

// =====================================================
// DELETE FAVORITE
// =====================================================
export const DeleteFavoriteParamsSchema = z.object({
  entity_type: z.literal("note").openapi({
    example: "note",
  }),
  entity_id: z.string().uuid().openapi({
    example: "1f2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
  }),
});
