"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Content } from "@tiptap/core";
import { useEffect } from "react";
import { createEditorExtensions } from "./extensions/editor.extensions";

type NoteRendererProps = {
  content: Content;
};

export function NoteRenderer({ content }: NoteRendererProps) {
  const editor = useEditor({
    extensions: createEditorExtensions(),
    content,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    const injectButtons = () => {
      const blocks = document.querySelectorAll("pre.hljs");

      blocks.forEach((block) => {
        const el = block as HTMLElement;

        if (el.querySelector(".copy-code-btn")) return;

        const button = document.createElement("button");
        button.className = "copy-code-btn";
        button.innerText = "Copiar";

        button.onclick = () => {
          navigator.clipboard.writeText(el.textContent ?? "");
          button.innerText = "Copiado ✓";
          setTimeout(() => (button.innerText = "Copiar"), 1500);
        };

        el.style.position = "relative";
        el.appendChild(button);
      });
    };

    // Esperar a que el DOM esté listo
    requestAnimationFrame(() => {
      setTimeout(injectButtons, 0);
    });
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="looma-note-renderer">
      <EditorContent editor={editor} />
    </div>
  );
}
