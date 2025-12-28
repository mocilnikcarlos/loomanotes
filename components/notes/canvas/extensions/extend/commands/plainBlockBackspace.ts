import { Command } from "@tiptap/core";

export const plainBlockBackspace: Command = ({ state, dispatch }) => {
  const { selection, schema } = state;
  const { $from, empty } = selection;

  if (!empty) return false;

  const parent = $from.parent;
  const isAtStart = $from.parentOffset === 0;

  if (parent.type.name === "blockquote" && parent.content.size === 0) {
    if (!dispatch) return true;
    dispatch(
      state.tr.setBlockType(
        $from.before(),
        $from.after(),
        schema.nodes.paragraph
      )
    );
    return true;
  }

  if (isAtStart && parent.type.name === "paragraph") {
    const beforePos = $from.before() - 1;
    if (beforePos < 0) return false;

    const nodeBefore = state.doc.nodeAt(beforePos);
    if (nodeBefore && nodeBefore.type.name === "blockquote") {
      if (!dispatch) return true;

      dispatch(state.tr.join($from.before()));
      return true;
    }
  }

  return false;
};
