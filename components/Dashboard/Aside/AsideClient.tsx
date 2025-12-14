"use client";

import { useEffect, useState } from "react";
import { AsideCard } from "./ui/AsideCard";
import { AsideDivider } from "./ui/AsideDivider";
import { AsideSection } from "./ui/AsideSection";
import { AsideList } from "./ui/AsideList";
import { CreateAsideItem } from "./ui/CreateAsideItem";

import { useCreateAsideItem } from "@/hooks/aside/useCreateAsideItem";
import { useDeleteAsideItem } from "@/hooks/aside/useDeleteAsideItem";
import { useRenameAsideItem } from "@/hooks/aside/useRenameAsideItem";

import { useAsideStore } from "@/store/aside.store";

export function AsideClient({ aside }: { aside: any }) {
  /* ============================
   * INIT STORE DESDE SERVER
   * ============================ */
  const initAside = useAsideStore((s) => s.init);

  useEffect(() => {
    initAside({
      looseNotes: aside.looseNotes,
      notebooks: aside.notebooks,
    });
  }, [aside, initAside]);

  /* ============================
   * STORE STATE
   * ============================ */
  const notes = useAsideStore((s) => s.looseNotes);
  const notebooks = useAsideStore((s) => s.notebooks);

  const addTemp = useAsideStore((s) => s.addTemp);
  const replaceTemp = useAsideStore((s) => s.replaceTemp);
  const deleteFromStore = useAsideStore((s) => s.deleteItem);
  const renameInStore = useAsideStore((s) => s.renameItem);

  /* ============================
   * CREATE
   * ============================ */
  const { creating, startCreate, confirmCreate, cancelCreate } =
    useCreateAsideItem({
      onOptimisticCreate(type) {
        const temp = {
          id: `temp-${Date.now()}`,
          title: "Creando...",
          isSkeleton: true,
          notebook_id: null,
        };

        addTemp(type, temp);
        return temp.id;
      },

      onCreated(type, realItem, tempId) {
        replaceTemp(type, tempId, realItem);
      },
    });

  /* ============================
   * DELETE
   * ============================ */
  const { deleteItem } = useDeleteAsideItem({
    onOptimisticDelete(type, id) {
      deleteFromStore(type, id);
    },
  });

  /* ============================
   * RENAME
   * ============================ */
  const [renaming, setRenaming] = useState<{
    type: "note" | "notebook";
    id: string;
  } | null>(null);

  const { renameItem } = useRenameAsideItem({
    onOptimisticRename(type, id, title) {
      renameInStore(type, id, title);
    },
  });

  /* ============================
   * RENDER
   * ============================ */
  return (
    <AsideCard>
      {/* ===================== */}
      {/* NOTES SUELTAS */}
      {/* ===================== */}
      <AsideSection>
        <CreateAsideItem
          label="Crear nota"
          active={creating === "note"}
          disabled={creating === "notebook"}
          onStart={() => startCreate("note")}
          onConfirm={(name) => confirmCreate("note", name)}
          onCancel={cancelCreate}
        />

        <AsideList
          items={notes}
          type="note"
          renaming={renaming}
          onDelete={deleteItem}
          onRenameStart={(id) => setRenaming({ type: "note", id })}
          onRenameCancel={() => setRenaming(null)}
          onRenameConfirm={async (type, id, name) => {
            await renameItem(type, id, name);
            setRenaming(null);
          }}
        />
      </AsideSection>

      <AsideDivider />

      {/* ===================== */}
      {/* NOTEBOOKS */}
      {/* ===================== */}
      <AsideSection>
        <CreateAsideItem
          label="Crear carpeta"
          active={creating === "notebook"}
          disabled={creating === "note"}
          onStart={() => startCreate("notebook")}
          onConfirm={(name) => confirmCreate("notebook", name)}
          onCancel={cancelCreate}
        />

        <AsideList
          items={notebooks}
          type="notebook"
          renaming={renaming}
          onDelete={deleteItem}
          onRenameStart={(id) => setRenaming({ type: "notebook", id })}
          onRenameCancel={() => setRenaming(null)}
          onRenameConfirm={async (type, id, name) => {
            await renameItem(type, id, name);
            setRenaming(null);
          }}
          renderNested={(notebook) => (
            <AsideList
              items={notebook.notes}
              type="note"
              nested
              renaming={renaming}
              onDelete={deleteItem}
              onRenameStart={(id) => setRenaming({ type: "note", id })}
              onRenameCancel={() => setRenaming(null)}
              onRenameConfirm={async (type, id, name) => {
                await renameItem(type, id, name);
                setRenaming(null);
              }}
            />
          )}
        />
      </AsideSection>
    </AsideCard>
  );
}
