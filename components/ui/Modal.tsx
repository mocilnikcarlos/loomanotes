"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/Card";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <Card className={cn("relative z-10 w-full max-w-lg", className)}>
        {/* Close */}
        <ButtonIcon
          icon={<X size={18} />}
          size="sm"
          variant="ghost"
          aria-label="Cerrar modal"
          onClick={onClose}
          className="absolute right-5 top-5"
        />

        {children}
      </Card>
    </div>,
    document.body
  );
}

interface ModalHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export function ModalHeader({ title, subtitle }: ModalHeaderProps) {
  return (
    <div className="mb-8 pr-10">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-subtitle">{subtitle}</p>}
    </div>
  );
}

interface ModalBodyProps {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return (
    <div className="flex flex-col text-sm text-foreground gap-4">
      {children}
    </div>
  );
}

interface ModalFooterProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  loading?: boolean;
}

export function ModalFooter({
  onCancel,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  loading,
}: ModalFooterProps) {
  return (
    <div className="mt-8 flex justify-end gap-2 w-full">
      <Button className="flex-1" variant="ghost" onClick={onCancel}>
        {cancelText}
      </Button>

      <Button
        className="flex-1"
        variant="brand"
        onClick={onConfirm}
        loading={loading}
      >
        {confirmText}
      </Button>
    </div>
  );
}
