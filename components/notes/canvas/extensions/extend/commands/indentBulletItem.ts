import { Command } from "@tiptap/core";
import { findAncestorOfType } from "./findAncestorOfType";
import { findAncestorListItem } from "../../../ui/blockmenu/helper/findAncestorListItem";

const MAX_INDENT = 2;

export const indentBulletItem =
  (dir: 1 | -1): Command =>
  ({ state, dispatch }) => {
    const { $from } = state.selection;
    const found = findAncestorListItem($from);
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
