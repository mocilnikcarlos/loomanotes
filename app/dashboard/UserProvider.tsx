// app/dashboard/UserProvider.tsx
"use client";

import { UserContext } from "@/context/user/UserContext";
import type { UserResponse } from "@/lib/schemas/user";

export default function UserProvider({
  user,
  children,
}: {
  user: UserResponse;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
