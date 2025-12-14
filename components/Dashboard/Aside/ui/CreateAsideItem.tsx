"use client";

import { useState } from "react";

export function CreateAsideItem({
  label,
  creating,
  onStart,
  onConfirm,
}: {
  label: string;
  creating: boolean;
  onStart: () => void;
  onConfirm: (name: string) => void;
}) {
  const [value, setValue] = useState("");

  if (!creating) {
    return (
      <div
        onClick={onStart}
        className="cursor-pointer px-6 py-2 text-sm text-subtitle hover:text-foreground"
      >
        + {label}
      </div>
    );
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onConfirm(value);
      }}
      className="w-full rounded-full px-4 py-2 text-sm bg-background border"
      placeholder="Nombre..."
    />
  );
}
