"use client";

import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useState } from "react";

export function useCreateAsideItem() {
  const router = useRouter();
  const [creating, setCreating] = useState<"note" | "notebook" | null>(null);

  function startCreate(type: "note" | "notebook") {
    setCreating(type);
  }

  async function confirmCreate(type: "note" | "notebook", name: string) {
    const res = await fetch(`/api/${type}s`, {
      method: "POST",
      body: JSON.stringify({ title: name }),
    });

    const data = await res.json();

    addToast({
      title: `${type === "note" ? "Nota" : "Carpeta"} creada`,
    });

    router.push(`/dashboard/${type}/${data.id}`);
    setCreating(null);
  }

  return { creating, startCreate, confirmCreate };
}
