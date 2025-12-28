"use client";

import type { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
  onClose: () => void;
};

export function LinkMenu({ editor, onClose }: Props) {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useT();

  useEffect(() => {
    const current = editor.getAttributes("link")?.href ?? "";
    setUrl(current);
  }, [editor]);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  function normalizeUrl(url: string) {
    const trimmed = url.trim();

    if (/^(https?:)?\/\//i.test(trimmed)) {
      return trimmed;
    }

    return `https://${trimmed}`;
  }

  function applyLink() {
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalizeUrl(url) })
      .run();
  }

  return (
    <div
      className="flex flex-col gap-2 w-64"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={inputRef}
        placeholder={t("canvas.toolbar.link.placeholder")}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            applyLink();
            onClose();
            editor.commands.focus();
          }
        }}
      />

      <div className="flex justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            onClose();
          }}
        >
          {t("canvas.toolbar.link.buttonRemove")}
        </Button>

        <Button variant="brand" size="sm" onClick={applyLink}>
          {t("canvas.toolbar.link.buttonApply")}
        </Button>
      </div>
    </div>
  );
}
