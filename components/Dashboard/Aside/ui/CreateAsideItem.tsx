"use client";

import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";

export function CreateAsideItem({
  label,
  active,
  disabled,
  onStart,
  onConfirm,
  onCancel,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onStart: () => void;
  onConfirm: (name: string) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  // 🔑 Reset interno cuando se desactiva
  useEffect(() => {
    if (!active) {
      setValue("");
      setSubmitting(false);
    }
  }, [active]);

  // 🔑 Click fuera → cancelar
  useEffect(() => {
    if (!active) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, onCancel]);

  if (!active) {
    return (
      <div
        onClick={!disabled ? onStart : undefined}
        className={`px-6 py-2 text-sm ${
          disabled
            ? "cursor-not-allowed text-muted"
            : "cursor-pointer text-subtitle hover:text-foreground"
        }`}
      >
        + {label}
      </div>
    );
  }

  async function handleConfirm() {
    if (!value.trim() || submitting) return;

    setSubmitting(true);
    await onConfirm(value);
  }

  return (
    <Input
      ref={ref}
      autoFocus
      disabled={submitting}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleConfirm();
        }

        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      className="w-full rounded-full px-4 py-2 text-sm bg-background border disabled:opacity-50"
      placeholder="Nombre..."
    />
  );
}
