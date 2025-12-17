// lib/auth/access.ts
import type {
  UserResponse,
  UserRoleEnum,
  UserPlanEnum,
} from "@/lib/schemas/user";
import { z } from "zod";

export const PlanAccess = {
  FREE: "free",
  PREMIUM: "premium",
} as const;

export const RoleAccess = {
  USER: "user",
  ADMIN: "admin",
} as const;

// ---- Role ----
export function isAdmin(user: UserResponse) {
  return user.role === RoleAccess.ADMIN;
}

export function assertRole(
  user: UserResponse,
  roles: Array<z.infer<typeof UserRoleEnum>>
) {
  if (!roles.includes(user.role)) {
    throw new Error("Unauthorized: invalid role");
  }
}

// ---- Plan ----
export function assertPlan(
  user: UserResponse,
  plans: Array<z.infer<typeof UserPlanEnum>>
) {
  if (!plans.includes(user.plan)) {
    throw new Error("Forbidden: insufficient plan");
  }
}
