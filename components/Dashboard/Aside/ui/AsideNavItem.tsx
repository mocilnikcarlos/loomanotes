"use client";

import Link from "next/link";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { NavItem } from "./NavItem";
import { Pencil, Trash } from "lucide-react";

export function AsideNavItem({
  title,
  href,
  active,
  icon,
  onRename,
  onDelete,
}: {
  title: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
  onRename: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu
      openOn="context"
      position="right"
      trigger={
        <Link href={href}>
          <NavItem active={active}>
            {icon && <span className="mr-2 text-icon">{icon}</span>}
            {title}
          </NavItem>
        </Link>
      }
    >
      <MenuItem icon={<Pencil size={14} />} onClick={onRename}>
        Renombrar
      </MenuItem>
      <MenuItem icon={<Trash size={14} />} onClick={onDelete}>
        Eliminar
      </MenuItem>
    </Menu>
  );
}
