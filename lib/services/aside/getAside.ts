import { getNotes } from "@/lib/services/notes/getNotes";
import { getNotebooks } from "@/lib/services/notebooks/getNotebooks";

export async function getAside() {
  const [looseNotes, notebooks] = await Promise.all([
    getNotes({ notebook_id: null }), // obtener notas sueltas
    getNotebooks(), // obtener notebooks
  ]);

  const notebooksWithNotes = await Promise.all(
    notebooks.map(async (notebook) => {
      // Para cada notebook, traemos sus notas
      const notes = await getNotes({ notebook_id: notebook.id });
      return { ...notebook, notes };
    })
  );

  return {
    looseNotes, // Notas sueltas
    notebooks: notebooksWithNotes, // Notebooks con sus notas
  };
}
