"use client";

import { useAsideStore } from "@/store/aside.store";
import { useRouter } from "next/navigation";
import { NoteCard } from "@/components/notebooks/ui/NoteCard";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/layout/Section";
import { useEffect } from "react";
import { OnlyPremium } from "@/lib/guards/OnlyPremium";
import { useT } from "@/hooks/utils/useT";

const useNotebookNotes = (id: string) =>
  useAsideStore((s) => {
    const notebook = s.notebooks.find((n) => n.id === id);
    return notebook ? notebook.notes : null;
  });

export default function NotebookClientPage({ id }: { id: string }) {
  const router = useRouter();

  const notes = useNotebookNotes(id);

  const addNote = useAsideStore((s) => s.addNote);
  const highlightedId = useAsideStore((s) => s.highlightedNoteId);
  const { t } = useT();

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: t("dashboard.notebook.placeholder"),
        notebook_id: id,
      }),
    });

    const note = await res.json();
    addNote(note);
    router.push(`/dashboard/note/${note.id}`);
  }

  useEffect(() => {
    if (notes === null) {
      router.replace("/dashboard");
    }
  }, [notes, router]);

  if (notes === null) {
    return null;
  }

  return (
    <Section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Header title={t("dashboard.notebook.title")} size="h3" />

        <OnlyPremium>
          <Button variant="brand" onClick={createNote}>
            {t("dashboard.notebook.buttonNewNote")}
          </Button>
        </OnlyPremium>
      </div>

      {/* Gallery */}
      {notes.length === 0 ? (
        <p className="text-sm text-subtitle">{t("dashboard.notebook.empty")}</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              created_at={note.created_at}
              highlighted={note.id === highlightedId}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
