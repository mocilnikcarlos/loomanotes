"use client";

import { Section } from "@/components/ui/layout/Section";
import { useAsideStore } from "@/store/aside.store";
import { EditableNoteTitle } from "@/components/notes/ui/EditableNoteTitle";
import { useEffect, useState } from "react";
import type { Note } from "@/store/aside.store";

export default function NotePageClient({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null);

  const renameInStore = useAsideStore((s) => s.renameItem);

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((r) => r.json())
      .then(setNote);
  }, [id]);

  function draftRename(title: string) {
    if (!note) return;

    // solo UI
    setNote({ ...note, title });
    renameInStore("note", note.id, title);
  }

  async function commitRename(finalTitle: string) {
    if (!note) return;

    const prev = note.title;

    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: finalTitle }),
    });

    if (!res.ok) {
      // rollback
      setNote({ ...note, title: prev });
      renameInStore("note", note.id, prev);
    }
  }

  if (!note) return null;

  return (
    <Section className="flex flex-col gap-6 w-full">
      <EditableNoteTitle
        value={note.title}
        onDraftChange={draftRename}
        onCommit={commitRename}
      />

      <div className="text-sm text-subtitle">ID: {id}</div>
    </Section>
  );
}
