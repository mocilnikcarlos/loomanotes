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

import { DragDropContext } from "@hello-pangea/dnd";

export function AsideClient({ aside }: { aside: any }) {
  /* ============================
   * INIT STORE DESDE SERVER
   * ============================ */
  const initAside = useAsideStore((s) => s.init);
  const moveNote = useAsideStore((s) => s.moveNote);

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

  const reorderNotes = (startIndex: number, endIndex: number) => {
    const reordered = [...notes];
    const [moved] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, moved);

    return reordered;
  };

  const reorderNotebooks = (startIndex: number, endIndex: number) => {
    const reordered = [...notebooks];
    const [moved] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, moved);

    return reordered;
  };

  const reorderBackend = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId === "loose-notes") {
      // Llamar al endpoint de reorder de notas sueltas
      await fetch(`/api/notes/reorder`, {
        method: "PATCH",
        body: JSON.stringify({
          items: [{ id: draggableId, position: destination.index }],
        }),
      });
    } else if (source.droppableId === "notebooks") {
      // Llamar al endpoint de reorder de notebooks
      await fetch(`/api/notebooks/reorder`, {
        method: "PATCH",
        body: JSON.stringify({
          items: [{ id: draggableId, position: destination.index }],
        }),
      });
    }
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const parseNotebook = (id: string) =>
      id === "loose-notes" ? null : id.replace("notebook:", "");

    const fromNotebookId = parseNotebook(source.droppableId);
    const toNotebookId = parseNotebook(destination.droppableId);

    // 1️⃣ Optimistic UI
    moveNote({
      noteId: draggableId,
      fromNotebookId,
      toNotebookId,
      toIndex: destination.index,
    });

    // 2️⃣ Persistencia backend
    await fetch("/api/notes/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notebook_id: toNotebookId,
        items: [
          {
            id: draggableId,
            position: destination.index,
          },
        ],
      }),
    });
  };

  /* ============================
   * RENDER
   * ============================ */
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            droppableId="loose-notes"
            isDragDisabled={false}
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
            isDragDisabled
            renaming={renaming}
            onDelete={deleteItem}
            onRenameStart={(id) => setRenaming({ type: "notebook", id })}
            onRenameCancel={() => setRenaming(null)}
            onRenameConfirm={async (type, id, name) => {
              await renameItem(type, id, name);
              setRenaming(null);
            }}
            renderNested={(notebook) => (
              <div className="relative ml-3 pl-3">
                {/* Línea vertical */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

                {/* Lista de notas */}
                <AsideList
                  items={notebook.notes}
                  type="note"
                  droppableId={`notebook:${notebook.id}`}
                  isDragDisabled={false}
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
              </div>
            )}
          />
        </AsideSection>
      </AsideCard>
    </DragDropContext>
  );
}
