"use client";

import { useAsideStore } from "@/store/aside.store";
import { useRouter } from "next/navigation";
import { NoteCard } from "@/components/notebooks/ui/NoteCard";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/layout/Section";

export default function NotebookClientPage({ id }: { id: string }) {
  const router = useRouter();

  const notes = useAsideStore(
    (s) => s.notebooks.find((n) => n.id === id)?.notes ?? []
  );

  const addNote = useAsideStore((s) => s.addNote);

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Nueva nota",
        notebook_id: id,
      }),
    });

    const note = await res.json();
    addNote(note);
    router.push(`/dashboard/note/${note.id}`);
  }

  return (
    <Section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Header title="Notas" size="h3" />

        <Button variant="brand" onClick={createNote}>
          Crear nota
        </Button>
      </div>

      {/* Gallery */}
      {notes.length === 0 ? (
        <p className="text-sm text-subtitle">
          Todavía no hay notas en esta notebook.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              created_at={note.created_at}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
