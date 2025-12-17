"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { useLayoutEffect } from "react";

interface EditableNoteTitleProps {
  value: string;
  onDraftChange: (next: string) => void;
  onCommit: (final: string) => Promise<void> | void;
}

export function EditableNoteTitle({
  value,
  onDraftChange,
  onCommit,
}: EditableNoteTitleProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(value);

  const initialValueRef = useRef(value);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(value);
  }, [value]);

  useLayoutEffect(() => {
    if (!editing) return;

    initialValueRef.current = value;

    const el = inputRef.current;
    if (!el) return;

    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [editing]);

  async function commit() {
    const final = title.trim();

    if (final && final !== initialValueRef.current) {
      await onCommit(final);
    }

    setEditing(false);
  }

  return (
    <div
      className={cn(
        "relative w-full pb-3",
        "px-0", // ⚠️ padding vive acá, no en los hijos
        "after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full",
        "after:bg-primary after:origin-left after:scale-x-0",
        "after:transition-transform after:duration-200 after:ease-out",
        editing && "after:scale-x-100"
      )}
    >
      {editing ? (
        <textarea
          ref={inputRef}
          value={title}
          rows={1}
          onChange={(e) => {
            const next = e.target.value;
            setTitle(next);
            onDraftChange(next);

            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              commit();
            }

            if (e.key === "Escape") {
              setTitle(initialValueRef.current);
              onDraftChange(initialValueRef.current);
              setEditing(false);
            }
          }}
          className={cn(
            "w-full",
            "appearance-none",
            "p-0 m-0", // 🔑 NO padding interno
            "bg-transparent",
            "text-3xl font-light text-title leading-tight",
            "whitespace-pre-wrap break-words",
            "border-none outline-none resize-none",
            "box-border", // 🔑 MISMO box-model que el wrapper
            "overflow-hidden"
          )}
        />
      ) : (
        <h1
          className={cn(
            "w-full",
            "text-3xl font-light text-title leading-tight",
            "cursor-text",
            "whitespace-pre-wrap break-words",
            "bg-transparent"
          )}
          onClick={() => setEditing(true)}
        >
          {value}
        </h1>
      )}
    </div>
  );
}
