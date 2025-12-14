"use client";

import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useState } from "react";

type Type = "note" | "notebook";

export function useCreateAsideItem(handlers?: {
  onOptimisticCreate?: (type: Type) => string;
  onCreated?: (type: Type, item: any, tempId: string) => void;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState<Type | null>(null);

  function startCreate(type: Type) {
    setCreating(type);
  }

  function cancelCreate() {
    setCreating(null);
  }

  async function confirmCreate(type: Type, name: string) {
    const tempId = handlers?.onOptimisticCreate?.(type);

    const res = await fetch(`/api/${type}s`, {
      method: "POST",
      body: JSON.stringify({ title: name }),
    });

    const data = await res.json();

    handlers?.onCreated?.(type, data, tempId!);

    addToast({
      title: `${type === "note" ? "Nota" : "Carpeta"} creada`,
    });

    router.push(`/dashboard/${type}/${data.id}`);
    setCreating(null);
  }

  return { creating, startCreate, confirmCreate, cancelCreate };
}
