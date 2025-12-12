// app/hooks/users/me/deleteUser.ts
export async function deleteUser() {
  const res = await fetch("/api/users/me", {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? "Error deleting user");
  }

  return res.json();
}
