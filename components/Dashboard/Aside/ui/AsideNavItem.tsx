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
import { useT } from "@/hooks/utils/useT";

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
  const { t } = useT();

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
          {t("aside.section.menuItem.rename")}
        </MenuItem>

        <MenuItem
          icon={<Trash size={14} />}
          onClick={() => setConfirmOpen(true)}
        >
          {t("aside.section.menuItem.delete")}
        </MenuItem>
      </Menu>

      {/* MODAL CONFIRMACIÓN */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalHeader
          title={t("aside.section.modal.title")}
          subtitle={t("aside.section.modal.subtitle")}
        />

        <ModalBody>
          <p className="break-words whitespace-pre-wrap">
            {t("aside.section.modal.body")}{" "}
            <span className="font-medium">{title}</span>?
          </p>
        </ModalBody>

        <ModalFooter
          cancelText={t("aside.section.modal.buttonCancel")}
          confirmText={t("aside.section.modal.buttonDelete")}
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
