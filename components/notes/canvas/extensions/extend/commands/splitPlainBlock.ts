import { Command } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

export const splitPlainBlock: Command = ({ state, dispatch }) => {
  const { selection, schema } = state;
  const { $from } = selection;

  if ($from.parent.type.name !== "blockquote") return false;

  const parent = $from.parent;
  const isEmpty = parent.content.size === 0;
  const isAtEnd = $from.parentOffset === parent.content.size;

  const nodeBefore = $from.nodeBefore;
  const isAfterHardBreak = nodeBefore?.type.name === "hardBreak";

  if (isEmpty || (isAtEnd && isAfterHardBreak)) {
    if (!dispatch) return true;

    let tr = state.tr;

    if (isAfterHardBreak) {
      tr = tr.delete($from.pos - 1, $from.pos);
    }

    const posAfter = tr.mapping.map($from.after());

    tr = tr.insert(posAfter, schema.nodes.paragraph.create());

    tr = tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));

    dispatch(tr.scrollIntoView());
    return true;
  }

  if (schema.nodes.hardBreak) {
    if (!dispatch) return true;

    dispatch(
      state.tr
        .replaceSelectionWith(schema.nodes.hardBreak.create())
        .scrollIntoView()
    );
    return true;
  }

  return false;
};
