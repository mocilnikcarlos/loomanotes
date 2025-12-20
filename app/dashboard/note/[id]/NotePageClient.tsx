"use client";

import { Section } from "@/components/ui/layout/Section";
import { useAsideStore } from "@/store/aside.store";
import { HeaderNote } from "@/components/notes/ui/HeaderNote";
import { useEffect, useState } from "react";
import type { Note } from "@/store/aside.store";
import Tiptap from "@/components/notes/Tiptap";
import { EditorCanvas } from "@/components/ui/layout/EditorCanvas";

export default function NotePageClient({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null);

  const renameInStore = useAsideStore((s) => s.renameItem);

  const storeTitle = useAsideStore((s) => {
    const note =
      s.looseNotes.find((n) => n.id === id) ||
      s.notebooks.flatMap((nb) => nb.notes).find((n) => n.id === id);

    return note?.title;
  });

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((r) => r.json())
      .then(setNote);
  }, [id]);

  useEffect(() => {
    if (!note || !storeTitle) return;

    if (note.title !== storeTitle) {
      setNote((prev) => (prev ? { ...prev, title: storeTitle } : prev));
    }
  }, [storeTitle]);

  function draftRename(title: string) {
    if (!note) return;
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
      setNote({ ...note, title: prev });
      renameInStore("note", note.id, prev);
    }
  }

  if (!note) return null;

  return (
    <div className="w-full">
      <HeaderNote
        noteId={note.id}
        title={note.title}
        onDraftChange={draftRename}
        onCommitTitle={commitRename}
      />

      {/* 👇 NUEVO: canvas del editor */}
      <EditorCanvas>
        <Tiptap noteId={note.id} initialContent={note.content} />
      </EditorCanvas>
    </div>
  );
}
