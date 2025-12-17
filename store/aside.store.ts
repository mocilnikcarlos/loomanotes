import { create } from "zustand";
import type { z } from "zod";
import { NoteSchema } from "@/lib/schemas/notes";
import { NotebookSchema } from "@/lib/schemas/notebooks";

export type Note = z.infer<typeof NoteSchema> & {
  isSkeleton?: boolean;
};

type Notebook = z.infer<typeof NotebookSchema> & {
  notes: Note[];
  isSkeleton?: boolean;
};

type MoveNotePayload = {
  noteId: string;
  fromNotebookId: string | null;
  toNotebookId: string | null;
  toIndex: number;
};

type AsideState = {
  initialized: boolean;
  looseNotes: Note[];
  notebooks: Notebook[];

  favorites: Set<string>;
  setFavorites: (ids: string[]) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;

  init: (data: { looseNotes: Note[]; notebooks: Notebook[] }) => void;

  addTemp: (type: "note" | "notebook", temp: any) => void;
  replaceTemp: (type: "note" | "notebook", tempId: string, real: any) => void;

  deleteItem: (type: "note" | "notebook", id: string) => void;
  renameItem: (type: "note" | "notebook", id: string, title: string) => void;

  addNote: (note: Note) => void;

  moveNote: (payload: MoveNotePayload) => void;
  highlightedNoteId: string | null;
  highlightNote: (id: string) => void;
};

export const useAsideStore = create<AsideState>((set, get) => ({
  initialized: false,
  highlightedNoteId: null,
  looseNotes: [],
  notebooks: [],

  favorites: new Set(),

  setFavorites(ids) {
    set({ favorites: new Set(ids) });
  },

  isFavorite(id) {
    return get().favorites.has(id);
  },

  async toggleFavorite(noteId: string) {
    const isFav = get().favorites.has(noteId);

    try {
      if (isFav) {
        const res = await fetch(
          `/api/favorites?entity_type=note&entity_id=${noteId}`,
          { method: "DELETE" }
        );

        if (!res.ok) throw new Error();

        const next = new Set(get().favorites);
        next.delete(noteId);
        set({ favorites: next });
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entity_type: "note",
            entity_id: noteId,
          }),
        });

        if (!res.ok) throw new Error();

        const next = new Set(get().favorites);
        next.add(noteId);
        set({ favorites: next });
      }
    } catch {
      // Sin rollback.
      // Supabase es la verdad.
    }
  },

  init(data) {
    set((state) => {
      if (state.initialized) return state;

      return {
        initialized: true,
        looseNotes: data.looseNotes,
        notebooks: data.notebooks,
      };
    });
  },

  highlightNote(id) {
    set({ highlightedNoteId: id });

    setTimeout(() => {
      set((state) =>
        state.highlightedNoteId === id ? { highlightedNoteId: null } : state
      );
    }, 400);
  },
  addTemp(type, temp) {
    set((state) => {
      if (type === "note") {
        return { looseNotes: [...state.looseNotes, temp] };
      }

      return { notebooks: [...state.notebooks, temp] };
    });
  },

  replaceTemp(type, tempId, real) {
    set((state) => {
      if (type === "note") {
        return {
          looseNotes: state.looseNotes.map((n) => (n.id === tempId ? real : n)),
        };
      }

      return {
        notebooks: state.notebooks.map((n) =>
          n.id === tempId ? { ...real, notes: [] } : n
        ),
      };
    });
  },

  deleteItem(type, id) {
    set((state) => {
      if (type === "note") {
        return {
          looseNotes: state.looseNotes.filter((n) => n.id !== id),
          notebooks: state.notebooks.map((nb) => ({
            ...nb,
            notes: nb.notes.filter((n) => n.id !== id),
          })),
        };
      }

      return {
        notebooks: state.notebooks.filter((n) => n.id !== id),
      };
    });
  },

  renameItem(type, id, title) {
    set((state) => {
      if (type === "note") {
        return {
          looseNotes: state.looseNotes.map((n) =>
            n.id === id ? { ...n, title } : n
          ),
          notebooks: state.notebooks.map((nb) => ({
            ...nb,
            notes: nb.notes.map((n) => (n.id === id ? { ...n, title } : n)),
          })),
        };
      }

      return {
        notebooks: state.notebooks.map((n) =>
          n.id === id ? { ...n, title } : n
        ),
      };
    });
  },

  addNote(note) {
    set((state) => {
      if (!note.notebook_id) {
        return { looseNotes: [...state.looseNotes, note] };
      }

      return {
        notebooks: state.notebooks.map((nb) =>
          nb.id === note.notebook_id
            ? { ...nb, notes: [...nb.notes, note] }
            : nb
        ),
      };
    });
  },

  moveNote({ noteId, fromNotebookId, toNotebookId, toIndex }) {
    set((state) => {
      let note: Note | undefined;

      const looseNotes = [...state.looseNotes];
      const notebooks = state.notebooks.map((n) => ({
        ...n,
        notes: [...n.notes],
      }));

      // 1️⃣ sacar de origen
      if (fromNotebookId === null) {
        const idx = looseNotes.findIndex((n) => n.id === noteId);
        if (idx === -1) return state;

        note = looseNotes[idx];
        looseNotes.splice(idx, 1);
      } else {
        const notebook = notebooks.find((n) => n.id === fromNotebookId);
        if (!notebook) return state;

        const idx = notebook.notes.findIndex((n) => n.id === noteId);
        if (idx === -1) return state;

        note = notebook.notes[idx];
        notebook.notes.splice(idx, 1);
      }

      if (!note) return state;

      // 2️⃣ actualizar notebook_id
      const movedNote = { ...note, notebook_id: toNotebookId };

      // 3️⃣ insertar en destino
      if (toNotebookId === null) {
        looseNotes.splice(toIndex, 0, movedNote);
      } else {
        const target = notebooks.find((n) => n.id === toNotebookId);
        if (!target) return state;

        target.notes.splice(toIndex, 0, movedNote);
      }

      return { looseNotes, notebooks };
    });
  },
}));
