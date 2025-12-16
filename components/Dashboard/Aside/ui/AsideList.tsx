"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AsideNavItem } from "@/components/dashboard/aside/ui/AsideNavItem";
import { Folder, FolderOpen, FileText } from "lucide-react";
import { CreateAsideItem } from "@/components/dashboard/aside/ui/CreateAsideItem";

type Item = {
  id: string;
  title: string;
  isSkeleton?: boolean;
  notes?: any[]; // Asegura que `notes` siempre sea un array (vacío si no existe)
};

type Props = {
  items: Item[]; // Cambio aquí, especificamos que `items` es un array de `Item`
  type: "note" | "notebook";
  nested?: boolean;

  droppableId?: string;
  isDragDisabled?: boolean;
  isDraggingNote?: boolean;

  onDelete: (type: "note" | "notebook", id: string) => void;
  onRenameStart: (id: string) => void;
  onRenameConfirm: (
    type: "note" | "notebook",
    id: string,
    name: string
  ) => Promise<void>;
  onRenameCancel: () => void;

  renaming: { type: "note" | "notebook"; id: string } | null;
  renderNested?: (item: any) => React.ReactNode;
};

export function AsideList({
  items = [], // Default vacío, por si `items` es undefined
  type,
  nested = false,
  droppableId,
  isDragDisabled,
  isDraggingNote = false,
  onDelete,
  onRenameStart,
  onRenameConfirm,
  onRenameCancel,
  renaming,
  renderNested,
}: Props) {
  const pathname = usePathname();

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const expandTimers = useRef<Record<string, NodeJS.Timeout>>({});

  /* ============================
   * AUTO OPEN POR URL
   * ============================ */
  useEffect(() => {
    if (type !== "notebook") return;

    items.forEach((item) => {
      if (pathname === `/dashboard/notebook/${item.id}`) {
        setOpen((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [pathname, items, type]);

  /* ============================
   * CLEANUP TIMERS
   * ============================ */
  useEffect(() => {
    return () => {
      Object.values(expandTimers.current).forEach(clearTimeout);
    };
  }, []);

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function scheduleExpand(id: string) {
    if (expandTimers.current[id]) return;

    expandTimers.current[id] = setTimeout(() => {
      setOpen((prev) => ({ ...prev, [id]: true }));
    }, 200);
  }

  function cancelExpand(id: string) {
    const timer = expandTimers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete expandTimers.current[id];
    }
  }

  /* ============================
   * LIST CONTENT
   * ============================ */
  const renderContent = (provided?: any) => (
    <div
      ref={provided?.innerRef}
      {...provided?.droppableProps}
      className={`flex flex-col gap-1 ${nested ? "pl-2" : ""}`}
    >
      {items.map((item, index) => {
        const isOpen = open[item.id] ?? false;
        const href = `/dashboard/${type}/${item.id}`;
        const active = pathname === href;

        const Icon = type === "note" ? FileText : isOpen ? FolderOpen : Folder;

        const shouldAutoExpand =
          type === "notebook" && isDraggingNote && !nested;

        if (renaming?.type === type && renaming.id === item.id) {
          return (
            <CreateAsideItem
              key={item.id}
              label=""
              active
              onStart={() => {}}
              onCancel={onRenameCancel}
              onConfirm={(name) => onRenameConfirm(type, item.id, name)}
            />
          );
        }

        return (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
            isDragDisabled={isDragDisabled}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onMouseEnter={() => {
                  if (shouldAutoExpand && !isOpen) {
                    scheduleExpand(item.id);
                  }
                }}
                onMouseLeave={() => {
                  if (shouldAutoExpand) {
                    cancelExpand(item.id);
                  }
                }}
              >
                <AsideNavItem
                  title={item.title}
                  href={href}
                  active={active}
                  icon={
                    !nested ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(item.id);
                        }}
                      >
                        <Icon size={16} />
                      </span>
                    ) : (
                      <Icon size={16} />
                    )
                  }
                  onRename={() => onRenameStart(item.id)}
                  onDelete={() => onDelete(type, item.id)}
                />

                {/* 👇 Nested SIEMPRE montado */}
                {!nested && renderNested && (
                  <div
                    className={`transition-all overflow-hidden ${
                      isOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {renderNested(item)}
                  </div>
                )}
              </div>
            )}
          </Draggable>
        );
      })}

      {provided?.placeholder}
    </div>
  );

  if (!droppableId) {
    return renderContent();
  }

  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => renderContent(provided)}
    </Droppable>
  );
}
