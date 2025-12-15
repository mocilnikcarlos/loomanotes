"use client";

import { useRouter, usePathname } from "next/navigation";
import { addToast } from "@heroui/react";

type Type = "note" | "notebook";

export function useDeleteAsideItem(handlers: {
  onOptimisticDelete: (type: Type, id: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function deleteItem(type: Type, id: string) {
    // 1. Optimistic UI
    handlers.onOptimisticDelete(type, id);

    // 2. Call BE
    const res = await fetch(`/api/${type}s/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      addToast({
        title: "Error al eliminar",
      });
      return;
    }

    // 3. Toast
    addToast({
      title: `${type === "note" ? "Nota" : "Carpeta"} eliminada`,
    });

    // 4. Si estaba viendo ese item → redirect
    if (pathname === `/dashboard/${type}/${id}`) {
      router.push("/dashboard");
    }
  }

  return { deleteItem };
}
