"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface MenuProps {
  trigger?: ReactNode;
  openOn?: "click" | "context";
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;

  /** NUEVO (opcional, no rompe usos existentes) */
  open?: boolean;
  coords?: { top: number; left: number };
  onOpenChange?: (open: boolean) => void;
}

export function Menu({
  trigger,
  openOn = "click",
  position = "bottom",
  children,
  open,
  coords: externalCoords,
  onOpenChange,
}: MenuProps) {
  /** Estado interno (modo no controlado, como antes) */
  const [internalOpen, setInternalOpen] = useState(false);
  const [rendered, setRendered] = useState(false);

  /** Modo controlado vs no controlado */
  const isControlled = typeof open === "boolean";
  const actualOpen = isControlled ? open : internalOpen;

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const GAP = 8;

  /** Abrir menú */
  const openMenu = () => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setRendered(true);
      requestAnimationFrame(() => setInternalOpen(true));
    }
  };

  /** Cerrar menú */
  const closeMenu = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
      setTimeout(() => setRendered(false), 150);
    }
  };

  /** Posicionamiento */
  useEffect(() => {
    if (!actualOpen || !menuRef.current) return;

    /** 🔹 Caso slash menu (coords externos) */
    if (externalCoords) {
      setCoords(externalCoords);
      return;
    }

    /** 🔹 Caso clásico (trigger) */
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    const map = {
      bottom: {
        top: triggerRect.bottom + GAP,
        left: triggerRect.left,
      },
      top: {
        top: triggerRect.top - menuRect.height - GAP,
        left: triggerRect.left,
      },
      right: {
        top: triggerRect.top,
        left: triggerRect.right + GAP,
      },
      left: {
        top: triggerRect.top,
        left: triggerRect.left - menuRect.width - GAP,
      },
    };

    setCoords(map[position]);
  }, [actualOpen, position, externalCoords]);

  /** Click fuera */
  useEffect(() => {
    if (!actualOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [actualOpen]);

  /** Trigger (NO cambia respecto a tu versión original) */
  let triggerElement: ReactNode = null;

  if (trigger) {
    triggerElement = (
      <div
        ref={triggerRef}
        onContextMenu={
          openOn === "context"
            ? (e) => {
                const target = e.target as HTMLElement;
                if (target.closest("[data-menu-ignore]")) return;

                e.preventDefault();
                openMenu();
              }
            : undefined
        }
        onClick={
          openOn === "click"
            ? (e) => {
                const target = e.target as HTMLElement;
                if (target.closest("[data-menu-ignore]")) return;

                actualOpen ? closeMenu() : openMenu();
              }
            : undefined
        }
      >
        {trigger}
      </div>
    );
  }

  return (
    <>
      {triggerElement}

      {(rendered || isControlled) &&
        createPortal(
          <div
            ref={menuRef}
            data-state={actualOpen ? "open" : "closed"}
            className={cn(
              "fixed z-50 min-w-[180px] rounded-xl border border-border bg-menu p-2 shadow-lg",
              "transition-[opacity,transform] duration-150 ease-out",
              actualOpen ? "visible" : "invisible",
              "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
              "data-[state=open]:opacity-100 data-[state=open]:scale-100"
            )}
            style={{ top: coords.top, left: coords.left }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

/** MenuItem (sin cambios) */
interface MenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function MenuItem({ icon, children, onClick, disabled }: MenuItemProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground cursor-pointer",
        "hover:bg-button-hover transition-colors",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {icon && <span className="text-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
