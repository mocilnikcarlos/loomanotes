import { ListNotebooksResponseSchema } from "@/lib/schemas/notebooks";
import { getBaseUrl } from "@/lib/api/getBaseUrl";
import { headers } from "next/headers";

export async function getNotebooks() {
  const baseUrl = await getBaseUrl();
  const h = await headers();

  const res = await fetch(`${baseUrl}/api/notebooks`, {
    cache: "no-store",
    headers: {
      cookie: h.get("cookie") ?? "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notebooks");
  }

  const json = await res.json();
  return ListNotebooksResponseSchema.parse(json);
}
