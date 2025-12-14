"use client";

import { usePathname } from "next/navigation";
import { AsideNavItem } from "./AsideNavItem";
import { CreateAsideItem } from "./CreateAsideItem";

export function AsideList({
  items,
  nested = false,
  onDelete,
  onRenameStart,
  onRenameConfirm,
  onRenameCancel,
  renaming,
  renderNested,
}: {
  items: any[];
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
  const type = nested ? "note" : "notebook";

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

        return (
          <AsideNavItem
            key={item.id}
            id={item.id}
            title={item.title}
            href={href}
            active={active}
            onRename={() => onRenameStart(item.id)}
            onDelete={() => onDelete(type, item.id)}
          />
        );
      })}
    </div>
  );
}
