"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cloneElement, isValidElement } from "react";

interface MenuProps {
  trigger?: ReactNode;
  openOn?: "click" | "context";
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

export function Menu({
  trigger,
  openOn = "click",
  position = "bottom",
  children,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [positioned, setPositioned] = useState(false);

  const GAP = 8;

  const openMenu = () => {
    setRendered(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeMenu = () => {
    setOpen(false);
    setTimeout(() => setRendered(false), 150);
  };

  /** Posicionamiento */
  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;

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
  }, [open, position]);

  /** Click fuera */
  useEffect(() => {
    if (!open) return;

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
  }, [open]);

  /** Trigger */
  let triggerElement: ReactNode = null;

  if (trigger && isValidElement(trigger)) {
    triggerElement = cloneElement(trigger, {
      ref: triggerRef,
      ...(openOn === "context"
        ? {
            onContextMenu: (e: React.MouseEvent) => {
              e.preventDefault();
              openMenu();
            },
          }
        : {
            onClick: () => (open ? closeMenu() : openMenu()),
          }),
    });
  }

  return (
    <>
      {triggerElement}

      {rendered &&
        createPortal(
          <div
            ref={menuRef}
            data-state={open ? "open" : "closed"}
            className={cn(
              "fixed z-50 min-w-[180px] rounded-xl border border-border bg-menu p-2 shadow-lg",
              "transition-[opacity,transform] duration-150 ease-out",
              open ? "visible" : "invisible",
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
