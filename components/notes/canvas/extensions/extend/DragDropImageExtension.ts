import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const DragDropImageExtension = Extension.create({
  name: "dragDropImage",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDrop: (view, event) => {
            const files = Array.from(event.dataTransfer?.files ?? []);
            const image = files.find((f) => f.type.startsWith("image/"));
            if (!image) return false;

            event.preventDefault();

            // Insertamos el bloque vacío (igual que botón / paste)
            const { state, dispatch } = view;
            const { tr } = state;

            const pos = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (!pos) return true;

            tr.insert(
              pos.pos,
              state.schema.nodes.imageBlock.create({
                src: null,
                path: null,
              })
            );

            dispatch(tr);

            // dejamos el file temporal (mismo patrón que paste)
            (window as any).__PASTED_IMAGE__ = image;

            return true;
          },
        },
      }),
    ];
  },
});
