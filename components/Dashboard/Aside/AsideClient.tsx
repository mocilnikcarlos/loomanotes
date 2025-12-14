"use client";

import { useState } from "react";
import { AsideCard } from "./ui/AsideCard";
import { AsideDivider } from "./ui/AsideDivider";
import { AsideSection } from "./ui/AsideSection";
import { AsideList } from "./ui/AsideList";
import { useCreateAsideItem } from "@/hooks/aside/useCreateAsideItem";
import { CreateAsideItem } from "./ui/CreateAsideItem";

type Item = { id: string; title: string; isSkeleton?: boolean };

export function AsideClient({ aside }: { aside: any }) {
  const [notes, setNotes] = useState<Item[]>(aside.notes);
  const [notebooks, setNotebooks] = useState<Item[]>(aside.notebooks);

  const { creating, startCreate, confirmCreate, cancelCreate } =
    useCreateAsideItem({
      onOptimisticCreate(type) {
        const temp = {
          id: `temp-${Date.now()}`,
          title: "Creando...",
          isSkeleton: true,
        };

        if (type === "note") setNotes((prev) => [temp, ...prev]);
        if (type === "notebook") setNotebooks((prev) => [temp, ...prev]);

        return temp.id;
      },

      onCreated(type, realItem, tempId) {
        const replace = (items: Item[]) =>
          items.map((i) => (i.id === tempId ? realItem : i));

        if (type === "note") setNotes(replace);
        if (type === "notebook") setNotebooks(replace);
      },
    });

  return (
    <AsideCard>
      <AsideSection>
        <CreateAsideItem
          label="Crear nota"
          active={creating === "note"}
          disabled={creating === "notebook"}
          onStart={() => startCreate("note")}
          onConfirm={(name) => confirmCreate("note", name)}
          onCancel={cancelCreate}
        />
        <AsideList items={notes} />
      </AsideSection>

      <AsideDivider />

      <AsideSection>
        <CreateAsideItem
          label="Crear carpeta"
          active={creating === "notebook"}
          disabled={creating === "note"}
          onStart={() => startCreate("notebook")}
          onConfirm={(name) => confirmCreate("notebook", name)}
          onCancel={cancelCreate}
        />

        <AsideList items={notebooks} nested />
      </AsideSection>
    </AsideCard>
  );
}
