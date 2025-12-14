"use client";

import { usePathname } from "next/navigation";
import { AsideNavItem } from "./AsideNavItem";

export function AsideList({
  items,
  nested = false,
  onDelete,
}: {
  items: any[];
  nested?: boolean;
  onDelete: (type: "note" | "notebook", id: string) => void;
}) {
  const pathname = usePathname();
  const type = nested ? "notebook" : "note";

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

        const href = `/dashboard/${type}/${item.id}`;
        const active = pathname === href;

        return (
          <AsideNavItem
            key={item.id}
            id={item.id}
            title={item.title}
            href={href}
            active={active}
            onRename={() => {
              console.log("rename", type, item.id);
            }}
            onDelete={() => onDelete(type, item.id)}
          />
        );
      })}
    </div>
  );
}
