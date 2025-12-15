"use client";

import { useState } from "react";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { NavItem } from "@/components/dashboard/aside/ui/NavItem";
import { Pencil, Trash } from "lucide-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Menu
        openOn="context"
        position="right"
        trigger={
          <div className="relative flex items-center">
            {/* ICONO TOGGLE – NO NAVEGA */}
            {icon && (
              <button
                type="button"
                aria-label="Toggle"
                className="absolute left-3 z-10 text-icon hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {icon}
              </button>
            )}

            {/* NAV ITEM – SOLO NAVEGA */}
            <NavItem active={active} onClick={() => router.push(href)}>
              <span className="pl-6 truncate">{title}</span>
            </NavItem>
          </div>
        }
      >
        <MenuItem icon={<Pencil size={14} />} onClick={onRename}>
          Renombrar
        </MenuItem>

        <MenuItem
          icon={<Trash size={14} />}
          onClick={() => setConfirmOpen(true)}
        >
          Eliminar
        </MenuItem>
      </Menu>

      {/* MODAL CONFIRMACIÓN */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalHeader
          title="Eliminar elemento"
          subtitle="Esta acción no se puede deshacer"
        />

        <ModalBody>¿Seguro que querés eliminar {title}?</ModalBody>

        <ModalFooter
          cancelText="Cancelar"
          confirmText="Eliminar"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            onDelete();
            setConfirmOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
