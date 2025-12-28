import { Extension } from "@tiptap/core";
import { splitPlainBlock } from "./splitPlainBlock";
import { plainBlockBackspace } from "./plainBlockBackspace";
import { findAncestorListItem } from "../../../ui/blockmenu/helper/findAncestorListItem";

export const PlainBlockBehavior = Extension.create({
  name: "plainBlockBehavior",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (findAncestorListItem(this.editor.state.selection.$from))
          return false;
        return this.editor.commands.command(splitPlainBlock);
      },
      Backspace: () => {
        if (findAncestorListItem(this.editor.state.selection.$from))
          return false;
        return this.editor.commands.command(plainBlockBackspace);
      },
    };
  },
});
