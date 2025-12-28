import type { Editor } from "@tiptap/core";

const FLAT_LIST_PM_TYPES = new Set(["bulletItem", "orderedItem", "taskItem"]);

export function normalizeDragHandlePos(
  editor: Editor,
  pos: number | null
): number | null {
  if (pos == null || pos < 0) return null;

  const { doc } = editor.state;
  if (pos > doc.content.size) return null;

  const $pos = doc.resolve(pos);

  // 1️⃣ PRIORIDAD: bulletItem más profundo
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    if (FLAT_LIST_PM_TYPES.has(node.type.name)) {
      return $pos.start(d);
    }
  }

  // 2️⃣ Fallback seguro
  return pos;
}
