const DRAGGABLE_BLOCK_TYPES = new Set([
  "paragraph",
  "heading",
  "bulletItem",
  "orderedItem",
  "taskItem",
  "blockquote",
  "codeBlock",
  "horizontalRule",
]);

export function findDraggableBlock(el: Element | null): HTMLElement | null {
  if (!el) return null;

  let node: HTMLElement | null = el as HTMLElement;

  while (node && node !== document.body) {
    const type = node.dataset?.type;

    // 🔥 ESTA es la condición correcta
    if (type && DRAGGABLE_BLOCK_TYPES.has(type)) {
      return node;
    }

    node = node.parentElement;
  }

  return null;
}
