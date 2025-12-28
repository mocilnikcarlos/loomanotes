"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLayoutEffect } from "react";

type MenuPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"
  | "left"
  | "right";

interface MenuProps {
  trigger?: ReactNode;
  openOn?: "click" | "context";
  position?: MenuPosition;
  children: ReactNode;
  open?: boolean;
  coords?: { top: number; left: number };
  onOpenChange?: (open: boolean) => void;
  className?: string;
  closeOnOutsideClick?: boolean;
}

export function Menu({
  trigger,
  openOn = "click",
  position = "bottom-start",
  children,
  open,
  coords: externalCoords,
  onOpenChange,
  className,
  closeOnOutsideClick = true,
}: MenuProps) {
  /** Estado interno (modo no controlado, como antes) */
  const [internalOpen, setInternalOpen] = useState(false);
  const [rendered, setRendered] = useState(false);

  /** Modo controlado vs no controlado */
  const isControlled = typeof open === "boolean";
  const actualOpen = isControlled ? open : internalOpen;

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const GAP = 8;

  /** Abrir menú */
  const openMenu = () => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setRendered(true);
      setInternalOpen(true);
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
  useLayoutEffect(() => {
    if (!actualOpen || !menuRef.current) return;

    if (externalCoords) {
      setCoords(externalCoords);
      return;
    }

    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    const alignX = {
      start: triggerRect.left,
      center: triggerRect.left + triggerRect.width / 2 - menuRect.width / 2,
      end: triggerRect.right - menuRect.width,
    };

    const map: Record<MenuPosition, { top: number; left: number }> = {
      "bottom-start": {
        top: triggerRect.bottom + GAP,
        left: alignX.start,
      },
      "bottom-center": {
        top: triggerRect.bottom + GAP,
        left: alignX.center,
      },
      "bottom-end": {
        top: triggerRect.bottom + GAP,
        left: alignX.end,
      },
      "top-start": {
        top: triggerRect.top - menuRect.height - GAP,
        left: alignX.start,
      },
      "top-center": {
        top: triggerRect.top - menuRect.height - GAP,
        left: alignX.center,
      },
      "top-end": {
        top: triggerRect.top - menuRect.height - GAP,
        left: alignX.end,
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
    if (!actualOpen || !closeOnOutsideClick) return;

    const handleClickOutside = (e: PointerEvent) => {
      const path = e.composedPath();

      if (menuRef.current && path.includes(menuRef.current)) {
        return;
      }

      if (triggerRef.current && path.includes(triggerRef.current)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [actualOpen, closeOnOutsideClick]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const stop = (e: Event) => {
      e.stopPropagation();
    };

    el.addEventListener("pointerdown", stop);

    return () => {
      el.removeEventListener("pointerdown", stop);
    };
  }, []);

  /** Trigger (NO cambia respecto a tu versión original) */
  let triggerElement: ReactNode = null;

  if (trigger) {
    triggerElement = (
      <div
        ref={triggerRef}
        onPointerDown={(e) => {
          if (e.button === 0) {
            e.stopPropagation();
          }
        }}
        onContextMenuCapture={
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
            data-state={actualOpen && coords ? "open" : "closed"}
            className={cn(
              "fixed z-50 rounded-xl border border-border bg-menu p-2 shadow-lg",
              "transition-[opacity,transform] duration-150 ease-out",
              !coords && "invisible",
              "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
              "data-[state=open]:opacity-100 data-[state=open]:scale-100",
              className
            )}
            style={
              coords
                ? { top: coords.top, left: coords.left }
                : { top: 0, left: 0 }
            }
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
  className?: string;
}

export function MenuItem({
  icon,
  children,
  onClick,
  disabled,
  className,
}: MenuItemProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2",
        "text-sm text-foreground cursor-pointer",
        "hover:bg-button-hover transition-colors",
        "overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <span className="text-icon shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
