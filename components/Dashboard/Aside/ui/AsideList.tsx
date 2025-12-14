import Link from "next/link";
import { NavItem } from "./NavItem";

type NoteItem = {
  id: string;
  title: string;
};

type NotebookItem = {
  id: string;
  title: string;
};

interface AsideListProps {
  items: NoteItem[] | NotebookItem[];
  nested?: boolean;
}

export function AsideList({ items, nested = false }: AsideListProps) {
  if (!items.length) return null;

  return (
    <div className={`flex flex-col gap-1 ${nested ? "pl-2" : ""}`}>
      {items.map((item) => {
        const isNotebook = "notes" in item === false;

        const href = isNotebook ? `/notebooks/${item.id}` : `/notes/${item.id}`;

        return (
          <Link key={item.id} href={href}>
            <NavItem>{item.title}</NavItem>
          </Link>
        );
      })}
    </div>
  );
}
