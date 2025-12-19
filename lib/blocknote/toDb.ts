import type { Block as BNBlock } from "@blocknote/core";
import type { CreateBlock } from "@/lib/schemas/blocks";

/**
 * Convierte bloques BlockNote a payload DB
 */
export function blocksToDb(noteId: string, blocks: BNBlock[]): CreateBlock[] {
  return blocks.filter(hasVisibleContent).map((block) => ({
    note_id: noteId,
    type: mapType(block.type),
    content: {
      type: block.type,
      content: block.content,
    },
  }));
}

/**
 * Determina si un bloque tiene contenido visible
 */
function hasVisibleContent(block: BNBlock): boolean {
  if (!block.content) return false;

  // block.content es un array de inline content
  return block.content.some((node: any) => {
    // texto con contenido real
    if (node.type === "text") {
      return node.text?.trim().length > 0;
    }

    // otros nodos inline (links, etc.)
    return true;
  });
}

/**
 * Reduce los tipos de BlockNote
 * a los tipos soportados por la DB
 */
function mapType(type: BNBlock["type"]): CreateBlock["type"] {
  switch (type) {
    case "heading":
      return "heading";
    case "quote":
      return "quote";
    case "codeBlock":
      return "code_block";
    case "image":
      return "image";
    default:
      // paragraph, bulletListItem, etc.
      return "paragraph";
  }
}
