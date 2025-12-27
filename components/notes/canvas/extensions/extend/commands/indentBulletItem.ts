import { Command } from "@tiptap/core";
import { findAncestorOfType } from "./findAncestorOfType";

const MAX_INDENT = 2;

export const indentBulletItem =
  (dir: 1 | -1): Command =>
  ({ state, dispatch }) => {
    const { $from } = state.selection;
    const found = findAncestorOfType($from, "bulletItem");
    if (!found) return false;

    const { node, pos } = found;

    const currentIndent = node.attrs.indent ?? 0;
    const nextIndent = Math.min(MAX_INDENT, Math.max(0, currentIndent + dir));

    // 🔒 No-op si no cambia (evita transacciones inútiles)
    if (nextIndent === currentIndent) return true;

    if (dispatch) {
      dispatch(
        state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          indent: nextIndent,
        })
      );
    }

    return true;
  };
