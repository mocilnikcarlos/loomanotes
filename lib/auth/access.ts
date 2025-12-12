// lib/auth/access.ts
import type { UserResponse } from "@/lib/schemas/user";

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

export function assertRole(user: UserResponse, roles: Array<string>) {
  if (!roles.includes(user.role)) {
    throw new Error("Unauthorized: invalid role");
  }
}

// ---- Plan ----
export function assertPlan(user: UserResponse, plans: Array<string>) {
  if (!plans.includes(user.plan)) {
    throw new Error("Forbidden: insufficient plan");
  }
}
