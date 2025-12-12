// app/hooks/users/me/updateUser.ts
import type { UserUpdate } from "@/lib/schemas/user";

export async function updateUser(data: UserUpdate) {
  const res = await fetch("/api/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? "Error updating user");
  }

  return res.json();
}
