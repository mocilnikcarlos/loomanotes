"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AsideNavItem } from "./AsideNavItem";
import { CreateAsideItem } from "./CreateAsideItem";
import { Folder, FolderOpen, FileText } from "lucide-react";

export function AsideList({
  items,
  type,
  nested = false,
  onDelete,
  onRenameStart,
  onRenameConfirm,
  onRenameCancel,
  renaming,
  renderNested,
}: {
  items: any[];
  type: "note" | "notebook";
  nested?: boolean;
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
}) {
  const pathname = usePathname();

  const [open, setOpen] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className={`flex flex-col gap-1 ${nested ? "pl-2" : ""}`}>
      {items.map((item) => {
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
        const isOpen = open[item.id] ?? true;

        const Icon = type === "note" ? FileText : isOpen ? FolderOpen : Folder;

        return (
          <div key={item.id} className="flex flex-col">
            <AsideNavItem
              title={item.title}
              href={href}
              active={active}
              icon={
                !nested ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
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
          </div>
        );
      })}
    </div>
  );
}
