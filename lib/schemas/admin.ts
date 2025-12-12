import { z } from "@/lib/openapi/zod";
import { UserPlanEnum, UserRoleEnum } from "./user";
import { UserResponseSchema } from "./user";

// =====================================================
// GET ALL USER (Admin)
// =====================================================
export const AdminListUsersResponseSchema = z.array(UserResponseSchema);

// =====================================================
// CREATE USER (Admin)
// =====================================================
export const AdminCreateUserSchema = z.object({
  email: z.string().email().openapi({ example: "user@example.com" }),

  full_name: z.string().nullable().optional().openapi({
    example: "John Doe",
  }),

  avatar_url: z.string().url().nullable().optional().openapi({
    example: "https://avatar.com/example.png",
  }),

  password: z.string().min(6).optional().openapi({ example: "123456" }),

  plan: UserPlanEnum.optional().openapi({ example: "free" }),
  role: UserRoleEnum.optional().openapi({ example: "user" }),
});

export type AdminCreateUser = z.infer<typeof AdminCreateUserSchema>;

// =====================================================
// DELETE USER (Admin)
// =====================================================
export const DeleteUserParamsSchema = z.object({
  id: z.string().uuid().openapi({
    example: "8cdddc81-2042-4f08-a910-e6c1627cef30",
  }),
});

export const DeleteUserResponseSchema = z.object({
  message: z.string().openapi({
    example: "User deleted successfully",
  }),
});

export type DeleteUserParams = z.infer<typeof DeleteUserParamsSchema>;
export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>;

// =====================================================
// UPDATE USER (Admin)
// =====================================================
//
// ⚠️ IMPORTANTE: este schema define SOLO los campos editables.
// Email y password se pueden agregar si lo querés, pero Supabase
// recomienda separar credenciales de metadata. Dejo ambos soportados.
//
export const AdminUpdateUserSchema = z.object({
  email: z.string().email().optional().openapi({
    example: "updated@example.com",
  }),
  password: z.string().min(6).optional().openapi({
    example: "newpass123",
  }),
  full_name: z.string().nullable().optional().openapi({
    example: "John Updated",
  }),
  avatar_url: z.string().url().nullable().optional().openapi({
    example: "https://avatar.com/updated.png",
  }),
  plan: UserPlanEnum.optional().openapi({ example: "premium" }),
  role: UserRoleEnum.optional().openapi({ example: "admin" }),
});

export const UpdateUserParamsSchema = z.object({
  id: z.string().uuid().openapi({
    example: "8cdddc81-2042-4f08-a910-e6c1627cef30",
  }),
});

export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>;
export type AdminUpdateUser = z.infer<typeof AdminUpdateUserSchema>;
