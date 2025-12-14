"use client";

import Link from "next/link";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { NavItem } from "./NavItem";
import { Pencil, Trash } from "lucide-react";

interface AsideNavItemProps {
  id: string;
  title: string;
  href: string;
  onRename: () => void;
  onDelete: () => void;
  active?: boolean;
}

export function AsideNavItem({
  id,
  title,
  href,
  onRename,
  onDelete,
  active,
}: AsideNavItemProps) {
  return (
    <Menu
      openOn="context"
      position="right"
      trigger={
        <div>
          <Link href={href}>
            <NavItem active={active}>{title}</NavItem>
          </Link>
        </div>
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
