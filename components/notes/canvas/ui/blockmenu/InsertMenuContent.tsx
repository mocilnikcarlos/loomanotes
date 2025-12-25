"use client";

import type { Editor } from "@tiptap/core";
import { BLOCKS } from "@/config/blocks.config";
import { BlockMenuItem } from "./BlockMenuItem";

type Props = {
  editor: Editor;
  onClose: () => void;
};

export function InsertMenuContent({ editor, onClose }: Props) {
  return (
    <div className="max-h-[320px] w-64 overflow-y-auto">
      {BLOCKS.map((block) => (
        <BlockMenuItem
          key={block.id}
          icon={block.icon}
          title={block.title}
          description={block.description}
          onSelect={() => {
            block.insert(editor);
            onClose();
          }}
        />
      ))}
    </div>
  );
}
