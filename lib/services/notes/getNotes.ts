import { ListNotesResponseSchema } from "@/lib/schemas/notes";
import { getBaseUrl } from "@/lib/api/getBaseUrl";
import { headers } from "next/headers";

type GetNotesParams = {
  notebook_id?: string | null;
};

export async function getNotes(params?: GetNotesParams) {
  const baseUrl = await getBaseUrl();
  const h = await headers();

  let url = `${baseUrl}/api/notes`;

  if (params?.notebook_id !== undefined) {
    url += `?notebook_id=${params.notebook_id}`;
  }

  const res = await fetch(url, {
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
