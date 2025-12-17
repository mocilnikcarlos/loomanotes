"use client";

import { Section } from "@/components/ui/layout/Section";
import { useAsideStore } from "@/store/aside.store";
import { HeaderNote } from "@/components/notes/ui/HeaderNote";
import { useEffect, useState } from "react";
import type { Note } from "@/store/aside.store";

export default function NotePageClient({ id }: { id: string }) {
  // 1Local state
  const [note, setNote] = useState<Note | null>(null);

  // Store actions / selectors
  const renameInStore = useAsideStore((s) => s.renameItem);

  const storeTitle = useAsideStore((s) => {
    const note =
      s.looseNotes.find((n) => n.id === id) ||
      s.notebooks.flatMap((nb) => nb.notes).find((n) => n.id === id);

    return note?.title;
  });

  // Effects — fetch inicial
  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((r) => r.json())
      .then(setNote);
  }, [id]);

  // Effects — sync store → page
  useEffect(() => {
    if (!note || !storeTitle) return;

    if (note.title !== storeTitle) {
      setNote((prev) => (prev ? { ...prev, title: storeTitle } : prev));
    }
  }, [storeTitle]);

  // UI handlers (sync / optimista)
  function draftRename(title: string) {
    if (!note) return;

    setNote({ ...note, title });
    renameInStore("note", note.id, title);
  }

  // Side-effect handlers (async / server)
  async function commitRename(finalTitle: string) {
    if (!note) return;

    const prev = note.title;

    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: finalTitle }),
    });

    if (!res.ok) {
      setNote({ ...note, title: prev });
      renameInStore("note", note.id, prev);
    }
  }

  // Guard
  if (!note) return null;

  return (
    <Section className="flex flex-col gap-6 w-full">
      <HeaderNote
        noteId={note.id}
        title={note.title}
        onDraftChange={draftRename}
        onCommitTitle={commitRename}
      />

      <div className="text-sm text-subtitle">ID: {id}</div>
    </Section>
  );
}
