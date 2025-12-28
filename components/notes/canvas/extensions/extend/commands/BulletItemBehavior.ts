import { Extension } from "@tiptap/core";
import { splitBulletItem } from "./splitBulletItem";
import { indentBulletItem } from "./indentBulletItem";
import { bulletItemBackspace } from "./bulletItemBackspace";

export const BulletItemBehavior = Extension.create({
  name: "bulletItemBehavior",

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.command(splitBulletItem),
      Tab: () => this.editor.commands.command(indentBulletItem(1)),
      "Shift-Tab": () => this.editor.commands.command(indentBulletItem(-1)),
      Backspace: () => this.editor.commands.command(bulletItemBackspace),
    };
  },
});
