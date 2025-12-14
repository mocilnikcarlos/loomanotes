import { ListNotesResponseSchema } from "@/lib/schemas/notes";
import { getBaseUrl } from "@/lib/api/getBaseUrl";
import { headers } from "next/headers";

export async function getNotes() {
  const baseUrl = await getBaseUrl();
  const h = await headers();

  const res = await fetch(`${baseUrl}/api/notes`, {
    cache: "no-store",
    headers: {
      cookie: h.get("cookie") ?? "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const json = await res.json();
  return ListNotesResponseSchema.parse(json);
}
