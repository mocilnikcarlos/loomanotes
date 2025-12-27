import { LIST_ITEM_TYPES } from "./listItemTypes";

export function findAncestorListItem($pos: any) {
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    if (LIST_ITEM_TYPES.has(node.type.name)) {
      return {
        node,
        pos: $pos.start(d) - 1,
        depth: d,
      };
    }
  }
  return null;
}
