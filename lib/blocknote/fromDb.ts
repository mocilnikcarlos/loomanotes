import type { Block as DbBlock } from "@/lib/schemas/blocks";
import type { PartialBlock } from "@blocknote/core";

export function blocksFromDb(blocks: DbBlock[]): PartialBlock[] {
  return blocks
    .sort((a, b) => a.position - b.position)
    .map((block) => ({
      id: block.id,
      type: mapType(block.type),
      content: block.content?.content ?? [],
    }));
}

function mapType(type: DbBlock["type"]): PartialBlock["type"] {
  switch (type) {
    case "heading":
      return "heading";
    case "quote":
      return "quote";
    case "code_block":
      return "codeBlock";
    case "image":
      return "image";
    default:
      return "paragraph";
  }
}
