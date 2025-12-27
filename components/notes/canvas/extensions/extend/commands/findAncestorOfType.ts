import type { ResolvedPos } from "prosemirror-model";

export function findAncestorOfType($pos: ResolvedPos, typeName: string) {
  for (let d = $pos.depth; d > 0; d--) {
    const node = $pos.node(d);
    if (node.type.name === typeName) {
      return { node, depth: d, pos: $pos.before(d) }; // pos del nodo
    }
  }
  return null;
}
