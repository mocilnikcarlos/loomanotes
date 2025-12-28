import { Extension } from "@tiptap/core";

export const ClearMarksOnEnterExtension = Extension.create({
  name: "clearMarksOnEnter",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { editor } = this;
        const { state, view } = editor;

        // dejamos que Enter haga su split normal
        const tr = state.tr;

        // importante: limpiar SOLO los storedMarks
        tr.setStoredMarks([]);

        view.dispatch(tr);

        return false; // permitir el Enter normal
      },
    };
  },
});
