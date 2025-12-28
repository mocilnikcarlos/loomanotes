"use client";

import type { Editor } from "@tiptap/core";
import { useBlockStyleSwitcher } from "@/hooks/notes/useBlockStyleSwitcher";
import { AsideDivider } from "@/components/dashboard/aside/ui/AsideDivider";
import { BLOCKS } from "@/config/blocks.config";
import { EditorMenuRow } from "../../shared/EditorMenuRow";

type Props = {
  editor: Editor;
  onSelect?: () => void;
};

const BLOCK_STYLE_IDS = [
  "paragraph",
  "heading_1",
  "heading_2",
  "heading_3",
  "bulletItem",
  "orderedItem",
  "taskItem",
  "blockquote",
  "codeBlock",
] as const;

export function BlockStylePopover({ editor, onSelect }: Props) {
  const { currentBlock, setBlock } = useBlockStyleSwitcher(editor);

  function handleSelect(type: Parameters<typeof setBlock>[0]) {
    setBlock(type);
    onSelect?.();
  }

  const items = BLOCKS.filter((b) => BLOCK_STYLE_IDS.includes(b.id as any));

  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className="flex flex-col gap-1"
    >
      <span className="px-2 py-1 text-xs text-foreground">Turn into</span>

      {items.map((block) => {
        const needsDivider =
          block.id === "bulletItem" || block.id === "blockquote";

        return (
          <div key={block.id}>
            <EditorMenuRow
              label={block.title}
              icon={block.icon}
              active={currentBlock === block.id}
              onClick={() => handleSelect(block.id as any)}
            />

            {needsDivider && <AsideDivider />}
          </div>
        );
      })}
    </div>
  );
}
