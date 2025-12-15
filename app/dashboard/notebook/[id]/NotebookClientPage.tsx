"use client";

import { useAsideStore } from "@/store/aside.store";
import { useRouter } from "next/navigation";

export default function NotebookClientPage({ id }: { id: string }) {
  const addNote = useAsideStore((s) => s.addNote);
  const router = useRouter();

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: "Nueva nota",
        notebook_id: id,
      }),
    });

    const note = await res.json();

    addNote(note); // 👈 el Aside se actualiza solo
    router.push(`/dashboard/note/${note.id}`);
  }

  return (
    <div>
      <h1>Notebook</h1>
      <button onClick={createNote}>Crear nota</button>
    </div>
  );
}
