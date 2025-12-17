import { cookies } from "next/headers";
import { ListFavoritesResponseSchema } from "@/lib/schemas/favorites";

export async function getFavorites() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/favorites`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const json = await res.json();

  return ListFavoritesResponseSchema.parse(json);
}
