import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { openSlashMenu } from "../../../helpers/slashMenuBridge";

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",

        render: () => {
          return {
            onStart: ({ editor, range }: any) => {
              const { left, bottom } = editor.view.coordsAtPos(range.from);

              openSlashMenu({
                editor,
                range,
                coords: {
                  top: bottom + 8,
                  left,
                },
              });
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
