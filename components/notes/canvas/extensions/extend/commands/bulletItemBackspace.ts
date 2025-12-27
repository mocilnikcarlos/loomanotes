import { Command } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { findAncestorOfType } from "./findAncestorOfType";

export const bulletItemBackspace: Command = ({ state, dispatch }) => {
  const { $from } = state.selection;
  const found = findAncestorOfType($from, "bulletItem");
  if (!found) return false;

  const { node, pos } = found;

  // solo cuando el cursor está al inicio del item
  if ($from.parentOffset !== 0) return false;

  const isEmpty = node.textContent.length === 0;
  if (!isEmpty) return false;

  const indent = node.attrs.indent ?? 0;

  if (dispatch) {
    let tr = state.tr;

    if (indent > 0) {
      tr = tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        indent: indent - 1,
      });
      dispatch(tr.scrollIntoView());
      return true;
    }

    // indent == 0 -> convertir a paragraph manteniendo texto (vacío)
    const paragraph = state.schema.nodes.paragraph;
    if (!paragraph) return false;

    tr = tr.setNodeMarkup(pos, paragraph, {});
    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));

    dispatch(tr.scrollIntoView());
  }

  return true;
};
