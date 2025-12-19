"use client";

import { Input } from "@/components/ui/Input";
import { useT } from "@/hooks/utils/useT";
import { Plus } from "lucide-react";
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
  const { t } = useT();

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
        className={`flex items-center gap-2 text-foreground rounded-full w-full px-4 py-3 text-sm transition-colors cursor-pointer select-none hover:bg-button-hover ${
          disabled
            ? "cursor-not-allowed text-muted"
            : "cursor-pointer text-subtitle hover:text-foreground"
        }`}
      >
        <Plus size={14} /> <span className="text-foreground">{label}</span>
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
      className="w-full border-none bg-button"
      placeholder={t("aside.section.group.inputNaming")}
    />
  );
}
