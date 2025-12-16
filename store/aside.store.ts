import { create } from "zustand";
import type { z } from "zod";
import { NoteSchema } from "@/lib/schemas/notes";
import { NotebookSchema } from "@/lib/schemas/notebooks";

type Note = z.infer<typeof NoteSchema> & {
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
  init: (data: { looseNotes: Note[]; notebooks: Notebook[] }) => void;

  addTemp: (type: "note" | "notebook", temp: any) => void;
  replaceTemp: (type: "note" | "notebook", tempId: string, real: any) => void;

  deleteItem: (type: "note" | "notebook", id: string) => void;
  renameItem: (type: "note" | "notebook", id: string, title: string) => void;

  addNote: (note: Note) => void;

  moveNote: (payload: MoveNotePayload) => void;
};

export const useAsideStore = create<AsideState>((set) => ({
  initialized: false,
  looseNotes: [],
  notebooks: [],

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
