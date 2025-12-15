"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePlanCapabilities } from "@/lib/plan/usePlanCapabilities";

type Type = "note" | "notebook";

export function useCreateAsideItem(
  params: { looseNotesCount: number },
  handlers?: {
    onOptimisticCreate?: (type: Type) => string;
    onCreated?: (type: Type, item: any, tempId: string) => void;
    onOptimisticRollback?: (type: Type, tempId: string) => void;
  }
) {
  const router = useRouter();
  const [creating, setCreating] = useState<Type | null>(null);

  const { canCreateNote, canCreateNotebook } = usePlanCapabilities({
    looseNotesCount: params.looseNotesCount,
  });

  function startCreate(type: Type) {
    setCreating(type);
  }

  function cancelCreate() {
    setCreating(null);
  }

  async function confirmCreate(type: Type, name: string) {
    // 🚫 notebooks = premium only
    if (type === "notebook" && !canCreateNotebook) {
      router.push("/update");
      setCreating(null);
      return;
    }

    // optimistic
    const tempId = handlers?.onOptimisticCreate?.(type);

    const res = await fetch(`/api/${type}s`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: name }),
    });

    // ❌ ERROR → rollback y cortar
    if (!res.ok) {
      handlers?.onOptimisticRollback?.(type, tempId!);
      setCreating(null);
      return;
    }

    const data = await res.json();

    // ✅ solo si fue OK
    handlers?.onCreated?.(type, data, tempId!);
    router.push(`/dashboard/${type}/${data.id}`);
    setCreating(null);
  }

  return {
    creating,
    startCreate,
    confirmCreate,
    cancelCreate,
  };
}
