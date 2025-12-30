import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const PasteImageExtension = Extension.create({
  name: "pasteImage",

  addStorage() {
    return {
      imageUpload: {} as Record<string, File>,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const files = Array.from(event.clipboardData?.files ?? []);
            const image = files.find((f) => f.type.startsWith("image/"));
            if (!image) return false;

            event.preventDefault();

            // Insertas el bloque NORMAL
            this.editor
              .chain()
              .focus()
              .insertContent({
                type: "imageBlock",
                attrs: { src: null, path: null },
              })
              .run();

            // Guardas el file en una variable global temporal
            (window as any).__PASTED_IMAGE__ = image;

            return true;
          },
        },
      }),
    ];
  },
});
