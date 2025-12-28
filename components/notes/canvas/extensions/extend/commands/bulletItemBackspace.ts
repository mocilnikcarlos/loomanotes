import { Command } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { findAncestorListItem } from "../../../ui/blockmenu/helper/findAncestorListItem";
import { LIST_ITEM_TYPES } from "../../../ui/blockmenu/helper/listItemTypes";

export const bulletItemBackspace: Command = ({ state, dispatch }) => {
  const { selection } = state;
  const { $from } = selection;

  const found = findAncestorListItem($from);

  if (!found) return false;

  const { node, pos, depth } = found;

  // Solo si el cursor está EXACTAMENTE al inicio
  if ($from.parentOffset !== 0) return false;

  const indent = node.attrs.indent ?? 0;

  const nodeStart = pos + 1;
  const nodeEnd = pos + node.nodeSize - 1;
  const text = state.doc.textBetween(nodeStart, nodeEnd, "", "");
  const isEmpty = text.length === 0;

  if (!dispatch) return true;

  let tr = state.tr;

  // --------------------------------------------------
  // 🆕 Caso 1: MERGE hacia arriba (indent > 0 + texto)
  // --------------------------------------------------
  if (indent > 0 && !isEmpty) {
    const $pos = state.doc.resolve(pos);
    const before = $pos.nodeBefore;

    if (before && LIST_ITEM_TYPES.has(before.type.name)) {
      const prevIndent = before.attrs.indent ?? 0;

      // Solo merge si el anterior es padre o hermano lógico
      if (prevIndent === indent || prevIndent === indent - 1) {
        const prevPos = pos - before.nodeSize;

        const mergedText =
          state.doc.textBetween(
            prevPos + 1,
            prevPos + before.nodeSize - 1,
            "",
            ""
          ) +
          " " +
          text;

        // Reemplazar el anterior con texto mergeado
        const mergedNode = before.type.create(
          { ...before.attrs },
          state.schema.text(mergedText)
        );

        tr = tr.replaceWith(prevPos, prevPos + before.nodeSize, mergedNode);

        // Eliminar el nodo actual
        const mappedPos = tr.mapping.map(pos);
        tr = tr.delete(mappedPos, mappedPos + node.nodeSize);

        // Cursor al final del texto mergeado
        const cursorPos = prevPos + mergedNode.nodeSize - 1;

        tr = tr.setSelection(TextSelection.near(tr.doc.resolve(cursorPos)));

        dispatch(tr.scrollIntoView());
        return true;
      }
    }
  }

  // --------------------------------------------------
  // Caso 2: indent > 0 → subir nivel
  // --------------------------------------------------
  if (indent > 0) {
    tr = tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      indent: indent - 1,
    });

    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));

    dispatch(tr.scrollIntoView());
    return true;
  }

  // --------------------------------------------------
  // Caso 3: indent === 0 + vacío → salir de lista
  // --------------------------------------------------
  if (!isEmpty) return false;

  const paragraph = state.schema.nodes.paragraph;
  if (!paragraph) return false;

  tr = tr.setNodeMarkup(pos, paragraph, {});
  tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));

  dispatch(tr.scrollIntoView());
  return true;
};
