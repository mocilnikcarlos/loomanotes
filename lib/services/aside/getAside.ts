import { getNotes } from "@/lib/services/notes/getNotes";
import { getNotebooks } from "@/lib/services/notebooks/getNotebooks";

export async function getAside() {
  const [notes, notebooks] = await Promise.all([getNotes(), getNotebooks()]);

  const looseNotes = notes.filter((n) => n.notebook_id === null);

  const notebooksWithNotes = notebooks.map((notebook) => ({
    ...notebook,
    notes: notes.filter((n) => n.notebook_id === notebook.id),
  }));

  return {
    looseNotes,
    notebooks: notebooksWithNotes,
  };
}
