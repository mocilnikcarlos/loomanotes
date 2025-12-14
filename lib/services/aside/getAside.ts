import { getNotes } from "@/lib/services/notes/getNotes";
import { getNotebooks } from "@/lib/services/notebooks/getNotebooks";

export async function getAside() {
  const [notes, notebooks] = await Promise.all([getNotes(), getNotebooks()]);

  return {
    notes,
    notebooks,
  };
}
