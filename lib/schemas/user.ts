import { z } from "@/lib/openapi/zod";

export const UserPlanEnum = z.enum(["free", "premium"]);
export const UserRoleEnum = z.enum(["user", "admin"]);

// UPDATE 👉 (Lo que agregamos)
export const UserUpdateSchema = z.object({
  full_name: z.string().nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

// RESPONSE
export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  plan: UserPlanEnum,
  role: UserRoleEnum,
  created_at: z.string().openapi({ example: "2025-01-01T12:00:00Z" }),
  updated_at: z.string().openapi({ example: "2025-01-01T12:00:00Z" }),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
