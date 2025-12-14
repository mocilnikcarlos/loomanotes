import Link from "next/link";
import { NavItem } from "./NavItem";

export function AsideList({ items, nested = false }: any) {
  return (
    <div className={`flex flex-col gap-1 ${nested ? "pl-2" : ""}`}>
      {items.map((item: any) =>
        item.isSkeleton ? (
          <div
            key={item.id}
            className="h-8 rounded-full bg-card animate-pulse"
          />
        ) : (
          <Link
            key={item.id}
            href={`/dashboard/${nested ? "notebook" : "note"}/${item.id}`}
          >
            <NavItem>{item.title}</NavItem>
          </Link>
        )
      )}
    </div>
  );
}
