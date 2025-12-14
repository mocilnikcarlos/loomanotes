"use client";

import { AsideCard } from "./ui/AsideCard";
import { AsideDivider } from "./ui/AsideDivider";
import { AsideSection } from "./ui/AsideSection";
import { AsideList } from "./ui/AsideList";
import { useCreateAsideItem } from "@/hooks/aside/useCreateAsideItem";
import { CreateAsideItem } from "./ui/CreateAsideItem";

export function AsideClient({ aside }: { aside: any }) {
  const { creating, startCreate, confirmCreate } = useCreateAsideItem();

  return (
    <AsideCard>
      <AsideSection>
        <CreateAsideItem
          label="Crear nota"
          onConfirm={(name) => confirmCreate("note", name)}
          creating={creating === "note"}
          onStart={() => startCreate("note")}
        />

        <AsideList items={aside.notes} />
      </AsideSection>

      <AsideDivider />

      <AsideSection>
        <CreateAsideItem
          label="Crear carpeta"
          onConfirm={(name) => confirmCreate("notebook", name)}
          creating={creating === "notebook"}
          onStart={() => startCreate("notebook")}
        />

        <AsideList items={aside.notebooks} nested />
      </AsideSection>
    </AsideCard>
  );
}
