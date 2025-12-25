export const LIST_CONTAINER_TYPES = new Set([
  "bulletList",
  "orderedList",
  "taskList",
]);

export function findInteractiveBlock(el: Element | null): HTMLElement | null {
  if (!el) return null;

  let node: HTMLElement | null = el as HTMLElement;
  const foundContainers: HTMLElement[] = [];

  while (node && node !== document.body) {
    if (
      node.classList?.contains("looma-block") &&
      node.dataset.type &&
      LIST_CONTAINER_TYPES.has(node.dataset.type)
    ) {
      foundContainers.push(node);
    }
    node = node.parentElement;
  }

  if (foundContainers.length > 0) {
    return foundContainers[foundContainers.length - 1];
  }

  return el.closest(
    `
    .looma-block[data-type="paragraph"],
    .looma-block[data-type="blockquote"],
    .looma-block[data-type="codeBlock"],
    .looma-block[data-type="horizontalRule"],
    .looma-block[data-type^="heading"]
    `
  ) as HTMLElement | null;
}
