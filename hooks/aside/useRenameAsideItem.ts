"use client";

import { addToast } from "@heroui/react";

type Type = "note" | "notebook";

export function useRenameAsideItem(handlers: {
  onOptimisticRename: (type: Type, id: string, title: string) => void;
}) {
  async function renameItem(type: Type, id: string, title: string) {
    handlers.onOptimisticRename(type, id, title);

    const res = await fetch(`/api/${type}s/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      addToast({
        title: "Error al renombrar",
      });
      return;
    }

    addToast({
      title: `${type === "note" ? "Nota" : "Carpeta"} renombrada`,
    });
  }

  return { renameItem };
}
