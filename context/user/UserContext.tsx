"use client";

import { createContext, useContext } from "react";
import type { UserResponse } from "@/lib/schemas/user";

export const UserContext = createContext<UserResponse | null>(null);

export function useUser() {
  return useContext(UserContext);
}
