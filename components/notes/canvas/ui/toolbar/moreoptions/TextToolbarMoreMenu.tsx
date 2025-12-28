"use client";

import type { Editor } from "@tiptap/react";
import {
  Copy,
  Subscript as SubIcon,
  Superscript as SuperIcon,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import { AsideDivider } from "@/components/dashboard/aside/ui/AsideDivider";
import { EditorMenuRow } from "../../shared/EditorMenuRow";

type Props = {
  editor: Editor;
  onClose: () => void;
};

export function TextToolbarMoreMenu({ editor, onClose }: Props) {
  function handleCopy() {
    editor.commands.focus();
    editor.view.dom.ownerDocument.execCommand("copy");

    addToast({
      title: "Copiado al portapapeles",
    });

    onClose();

    requestAnimationFrame(() => {
      editor.commands.blur();
    });
  }

  return (
    <div className="flex flex-col gap-1 p-1">
      <EditorMenuRow
        label="Subíndice"
        icon={SubIcon}
        active={editor.isActive("subscript")}
        onClick={() => {
          editor.chain().focus().toggleSubscript().run();
          onClose();
        }}
      />

      <EditorMenuRow
        label="Superíndice"
        icon={SuperIcon}
        active={editor.isActive("superscript")}
        onClick={() => {
          editor.chain().focus().toggleSuperscript().run();
          onClose();
        }}
      />

      <AsideDivider />

      <EditorMenuRow label="Copiar" icon={Copy} onClick={handleCopy} />
    </div>
  );
}
