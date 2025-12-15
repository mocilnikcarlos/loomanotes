import { create } from "zustand";

type Note = {
  id: string;
  title: string;
  notebook_id: string | null;
  isSkeleton?: boolean;
};

type Notebook = {
  id: string;
  title: string;
  notes: Note[];
  isSkeleton?: boolean;
};

type AsideState = {
  looseNotes: Note[];
  notebooks: Notebook[];

  init: (data: { looseNotes: Note[]; notebooks: Notebook[] }) => void;

  addTemp: (type: "note" | "notebook", temp: any) => void;
  replaceTemp: (type: "note" | "notebook", tempId: string, real: any) => void;

  deleteItem: (type: "note" | "notebook", id: string) => void;
  renameItem: (type: "note" | "notebook", id: string, title: string) => void;

  addNote: (note: Note) => void;
};

export const useAsideStore = create<AsideState>((set) => ({
  looseNotes: [],
  notebooks: [],

  init(data) {
    set(data);
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
}));
