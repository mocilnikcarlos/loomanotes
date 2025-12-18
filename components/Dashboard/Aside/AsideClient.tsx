"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AsideCard } from "@/components/dashboard/aside/ui/AsideCard";
import { AsideDivider } from "@/components/dashboard/aside/ui/AsideDivider";
import { AsideSection } from "@/components/dashboard/aside/ui/AsideSection";
import { AsideList } from "@/components/dashboard/aside/ui/AsideList";
import { CreateAsideItem } from "@/components/dashboard/aside/ui/CreateAsideItem";
import { NavGroup } from "@/components/dashboard/aside/ui/NavGroup";

import { useCreateAsideItem } from "@/hooks/aside/useCreateAsideItem";
import { useDeleteAsideItem } from "@/hooks/aside/useDeleteAsideItem";
import { useRenameAsideItem } from "@/hooks/aside/useRenameAsideItem";

import { useAsideStore } from "@/store/aside.store";

import { usePlanCapabilities } from "@/lib/plan/usePlanCapabilities";

import { useRouter } from "next/navigation";
import { useT } from "@/hooks/utils/useT";

const AsideDndProvider = dynamic(
  () => import("./AsideDndProvider").then((m) => m.AsideDndProvider),
  { ssr: false }
);

let reorderTimeout: ReturnType<typeof setTimeout> | null = null;

function persistReorder(payload: any) {
  if (reorderTimeout) {
    clearTimeout(reorderTimeout);
  }

  reorderTimeout = setTimeout(() => {
    fetch("/api/notes/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }, 300);
}

export function AsideClient({ aside }: { aside: any }) {
  const router = useRouter();
  const { t } = useT();
  /* ============================
   * DRAG STATE GLOBAL
   * ============================ */
  const [isDraggingNote, setIsDraggingNote] = useState(false);

  /* ============================
   * INIT STORE DESDE SERVER
   * ============================ */
  const initAside = useAsideStore((s) => s.init);
  const moveNote = useAsideStore((s) => s.moveNote);
  const highlightNote = useAsideStore((s) => s.highlightNote);

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
   * BUSINESS MODEL
   * ============================ */
  const { canCreateNote, canCreateNotebook } = usePlanCapabilities({
    looseNotesCount: notes.length,
  });

  const noteCtaLabel = canCreateNote
    ? t("aside.actions.buttonCrateNote")
    : t("aside.actions.updatePlan");
  const notebookCtaLabel = canCreateNotebook
    ? t("aside.actions.buttonCrateNotebook")
    : t("aside.actions.updatePlan");

  /* ============================
   * CREATE
   * ============================ */
  const { creating, startCreate, confirmCreate, cancelCreate } =
    useCreateAsideItem(
      {
        looseNotesCount: notes.length, // 👈 CLAVE
      },
      {
        onOptimisticCreate(type) {
          const temp = {
            id: `temp-${Date.now()}`,
            title: t("aside.actions.skeletonState"),
            isSkeleton: true,
            notebook_id: null,
          };

          addTemp(type, temp);
          return temp.id;
        },

        onCreated(type, realItem, tempId) {
          replaceTemp(type, tempId, realItem);
        },

        onOptimisticRollback(type, tempId) {
          deleteFromStore(type, tempId);
        },
      }
    );

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

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (type === "note" && destination.droppableId === "notebooks") {
      return;
    }

    const parseNotebook = (id: string) => {
      if (id === "loose-notes") return null;
      if (id.startsWith("notebook:")) return id.replace("notebook:", "");
      return null;
    };

    const fromNotebookId = parseNotebook(source.droppableId);
    const toNotebookId = parseNotebook(destination.droppableId);

    if (type === "note" && toNotebookId === undefined) {
      return;
    }

    // 1️⃣ mover en el store (optimista)
    moveNote({
      noteId: draggableId,
      fromNotebookId,
      toNotebookId,
      toIndex: destination.index,
    });

    // ✨ SOLO si cambia de carpeta
    if (fromNotebookId !== toNotebookId) {
      highlightNote(draggableId);
    }

    // 3️⃣ persistir backend
    persistReorder({
      notebook_id: toNotebookId,
      items: [{ id: draggableId, position: destination.index }],
    });
  };

  /* ============================
   * RENDER
   * ============================ */
  return (
    <AsideDndProvider
      onDragStart={(start) => {
        if (start.type === "note") {
          setIsDraggingNote(true);
        }
      }}
      onDragEnd={(result) => {
        setIsDraggingNote(false);
        handleDragEnd(result);
      }}
    >
      <AsideCard>
        {/* ===================== */}
        {/* NOTES SUELTAS */}
        {/* ===================== */}
        <AsideSection>
          <NavGroup title={t("aside.section.group.noteTitle")}>
            <CreateAsideItem
              label={noteCtaLabel}
              active={creating === "note"}
              disabled={creating === "notebook"}
              onStart={() => {
                if (!canCreateNote) {
                  router.push("/update");
                  return;
                }

                startCreate("note");
              }}
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
          </NavGroup>
        </AsideSection>

        <AsideDivider />

        {/* ===================== */}
        {/* NOTEBOOKS */}
        {/* ===================== */}
        <AsideSection>
          <NavGroup title={t("aside.section.group.notebookTitle")}>
            <CreateAsideItem
              label={notebookCtaLabel}
              active={creating === "notebook"}
              disabled={creating === "note"}
              onStart={() => {
                if (!canCreateNotebook) {
                  router.push("/update");
                  return;
                }

                startCreate("notebook");
              }}
              onConfirm={(name) => confirmCreate("notebook", name)}
              onCancel={cancelCreate}
            />

            <AsideList
              items={notebooks}
              type="notebook"
              droppableId="notebooks"
              isDragDisabled
              isDraggingNote={isDraggingNote}
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
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

                  <AsideList
                    items={notebook.notes}
                    type="note"
                    droppableId={`notebook:${notebook.id}`}
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
          </NavGroup>
        </AsideSection>
      </AsideCard>
    </AsideDndProvider>
  );
}
