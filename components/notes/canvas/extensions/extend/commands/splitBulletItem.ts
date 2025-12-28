import { Command } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";
import { findAncestorOfType } from "./findAncestorOfType";
import { findAncestorListItem } from "../../../ui/blockmenu/helper/findAncestorListItem";

const MAX_INDENT = 2;

export const splitBulletItem: Command = ({ state, dispatch }) => {
  const { selection } = state;
  const { $from } = selection;

  const found = findAncestorListItem($from);

  if (!found) return false;

  const { node, depth, pos } = found;

  const indent = node.attrs.indent ?? 0;
  const nodeStart = pos + 1;
  const nodeEnd = pos + node.nodeSize - 1;
  const cursorPos = selection.from;

  const isAtStart = cursorPos <= nodeStart;

  const textBefore = state.doc.textBetween(nodeStart, cursorPos, "", "");
  const textAfter = state.doc.textBetween(cursorPos, nodeEnd, "", "");

  const isEmpty = textBefore.length === 0 && textAfter.length === 0;

  const isMiddle =
    cursorPos > nodeStart &&
    cursorPos < nodeEnd &&
    textBefore.length > 0 &&
    textAfter.length > 0;

  // --------------------------------------------------
  // 1️⃣ ITEM VACÍO → subir nivel o salir
  // --------------------------------------------------
  if (isEmpty) {
    if (!dispatch) return true;

    let tr = state.tr;

    if (indent > 0) {
      tr = tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        indent: indent - 1,
      });

      tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));
      dispatch(tr.scrollIntoView());
      return true;
    }

    const paragraph = state.schema.nodes.paragraph;
    if (!paragraph) return false;

    tr = tr.setNodeMarkup(pos, paragraph, {});
    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));

    dispatch(tr.scrollIntoView());
    return true;
  }

  // --------------------------------------------------
  // 🆕 CURSOR AL INICIO (NO VACÍO) → crear item ARRIBA
  // --------------------------------------------------
  if (isAtStart && !isEmpty) {
    if (!dispatch) return true;

    let tr = state.tr;

    const newItem = node.type.createAndFill({
      ...node.attrs,
      checked: false,
    });

    if (!newItem) return false;

    tr = tr.insert(pos, newItem);

    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));

    dispatch(tr.scrollIntoView());
    return true;
  }

  // --------------------------------------------------
  // 2️⃣ CURSOR EN MEDIO
  // --------------------------------------------------
  if (isMiddle) {
    if (!dispatch) return true;

    let tr = state.tr;

    const updatedCurrent = node.type.create(
      { ...node.attrs },
      state.schema.text(textBefore)
    );

    tr = tr.replaceWith(pos, pos + node.nodeSize, updatedCurrent);

    const insertPos = tr.mapping.map(pos + updatedCurrent.nodeSize);

    // 2.a → puede crear HIJO
    if (indent < MAX_INDENT) {
      const childItem = node.type.create(
        {
          ...node.attrs,
          indent: indent + 1,
          checked: false,
        },
        state.schema.text(textAfter)
      );

      tr = tr.insert(insertPos, childItem);
      tr = tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));

      dispatch(tr.scrollIntoView());
      return true;
    }

    // 2.b → MAX_INDENT alcanzado → crear HERMANO
    const siblingItem = node.type.create(
      {
        ...node.attrs,
        checked: false,
      },
      state.schema.text(textAfter)
    );

    tr = tr.insert(insertPos, siblingItem);
    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));

    dispatch(tr.scrollIntoView());
    return true;
  }

  // --------------------------------------------------
  // 3️⃣ CURSOR AL FINAL → crear HERMANO
  // --------------------------------------------------
  const insertPos = $from.after(depth);

  if (dispatch) {
    const newItem = node.type.createAndFill({
      ...node.attrs,
      checked: false,
    });

    if (!newItem) return false;

    let tr = state.tr.insert(insertPos, newItem);

    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));

    dispatch(tr.scrollIntoView());
  }

  return true;
};
