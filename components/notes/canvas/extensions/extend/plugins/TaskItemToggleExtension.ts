// TaskItemToggleExtension.ts
import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const TaskItemToggleExtension = Extension.create({
  name: "taskItemToggle",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos, event) {
            const target = event.target as HTMLElement;

            if (!target.classList.contains("task-checkbox")) {
              return false;
            }

            const { state, dispatch } = view;
            const { doc, tr } = state;
            const $pos = state.doc.resolve(pos);

            // 1️⃣ Encontrar el taskItem clickeado
            for (let depth = $pos.depth; depth > 0; depth--) {
              const node = $pos.node(depth);
              if (node.type.name !== "taskItem") continue;

              const nodePos = $pos.before(depth);
              const parentIndent = node.attrs.indent;
              const nextChecked = !node.attrs.checked;

              // Toggle del nodo clickeado
              tr.setNodeMarkup(nodePos, undefined, {
                ...node.attrs,
                checked: nextChecked,
              });

              // 2️⃣ Cascade SIEMPRE (check o uncheck)
              let offset = nodePos + node.nodeSize;

              while (offset < doc.content.size) {
                const nextNode = doc.nodeAt(offset);
                if (!nextNode) break;

                // Cortar si no es taskItem
                if (nextNode.type.name !== "taskItem") break;

                // Cortar si ya no es hijo / nieto
                if (nextNode.attrs.indent <= parentIndent) break;

                // Propagar estado
                tr.setNodeMarkup(offset, undefined, {
                  ...nextNode.attrs,
                  checked: nextChecked,
                });

                offset += nextNode.nodeSize;
              }

              dispatch(tr);
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
