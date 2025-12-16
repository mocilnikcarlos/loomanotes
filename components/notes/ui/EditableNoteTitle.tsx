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
        "relative pb-3",
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
            "appearance-none p-0 m-0 w-full",
            "text-3xl font-light leading-9.5 text-title",
            "border-none outline-none focus:outline-none",
            "focus:ring-0 focus:ring-offset-0",
            "resize-none overflow-hidden box-border"
          )}
        />
      ) : (
        <h1
          className="text-3xl font-light text-title leading-tight cursor-text p-0 m-0"
          onClick={() => setEditing(true)}
        >
          {value}
        </h1>
      )}
    </div>
  );
}
