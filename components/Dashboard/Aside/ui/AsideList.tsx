"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AsideNavItem } from "./AsideNavItem";
import { CreateAsideItem } from "./CreateAsideItem";
import { Folder, FolderOpen, FileText } from "lucide-react";

type Props = {
  items: any[];
  type: "note" | "notebook";
  nested?: boolean;

  droppableId?: string;
  isDragDisabled?: boolean;

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
  items,
  type,
  nested = false,
  droppableId,
  isDragDisabled,
  onDelete,
  onRenameStart,
  onRenameConfirm,
  onRenameCancel,
  renaming,
  renderNested,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (type !== "notebook") return;

    items.forEach((item) => {
      if (pathname === `/dashboard/notebook/${item.id}`) {
        setOpen((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [pathname, items, type]);

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const content = (provided?: any) => (
    <div
      ref={provided?.innerRef}
      {...provided?.droppableProps}
      className={`flex flex-col gap-1 ${nested ? "pl-2" : ""}`}
    >
      {items.map((item, index) => {
        if (item.isSkeleton) {
          return (
            <div
              key={item.id}
              className="h-8 rounded-full bg-card animate-pulse"
            />
          );
        }

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

        const href = `/dashboard/${type}/${item.id}`;
        const active = pathname === href;
        const isOpen = open[item.id] ?? false;

        const Icon = type === "note" ? FileText : isOpen ? FolderOpen : Folder;

        const row = (
          <>
            <AsideNavItem
              title={item.title}
              href={href}
              active={active}
              icon={
                !nested ? (
                  <span
                    data-toggle
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

            {!nested && isOpen && renderNested?.(item)}
          </>
        );

        if (!droppableId) return <div key={item.id}>{row}</div>;

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
              >
                {row}
              </div>
            )}
          </Draggable>
        );
      })}

      {provided?.placeholder}
    </div>
  );

  if (!droppableId) {
    return content();
  }

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => content(provided)}
    </Droppable>
  );
}
