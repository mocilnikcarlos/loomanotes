import { Extension } from "@tiptap/core";

export const LinkBoundaryExtension = Extension.create({
  name: "linkBoundary",

  addKeyboardShortcuts() {
    return {
      Space: () => {
        const { editor } = this;
        const { state, view } = editor;

        if (!editor.isActive("link")) {
          return false;
        }

        const tr = state.tr;

        // 🔑 cortar SOLO los storedMarks (no el contenido)
        tr.setStoredMarks([]);

        view.dispatch(tr);
        return false; // deja que el espacio se escriba
      },

      Enter: () => {
        const { editor } = this;
        const { state, view } = editor;

        if (!editor.isActive("link")) {
          return false;
        }

        const tr = state.tr;
        tr.setStoredMarks([]);

        view.dispatch(tr);
        return false;
      },
    };
  },
});
