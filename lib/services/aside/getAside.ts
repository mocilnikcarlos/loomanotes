// lib/services/aside/getAside.ts
import { getNotes } from "@/lib/services/notes/getNotes";
import { getNotebooks } from "@/lib/services/notebooks/getNotebooks";

export async function getAside() {
  const [looseNotes, notebooks] = await Promise.all([
    getNotes({ notebook_id: null }),
    getNotebooks(),
  ]);

  const notebooksWithNotes = await Promise.all(
    notebooks.map(async (notebook) => {
      const notes = await getNotes({ notebook_id: notebook.id });
      return { ...notebook, notes };
    })
  );

  return {
    looseNotes,
    notebooks: notebooksWithNotes,
  };
}
