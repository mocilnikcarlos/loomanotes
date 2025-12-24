"use client";

import type { Editor } from "@tiptap/react";
import { RecentColor } from "./types";
import { AppliedStyleSection } from "./AppliedStyleSection";
import { TextColorSection } from "./TextColorSection";
import { HighlightColorSection } from "./HighlightColorSection";

type Props = {
  editor: Editor;
  recentColors: RecentColor[];
  activeTextColor: string | null;
  activeHighlightColor: string | null;
  onPushRecent: (entry: RecentColor) => void;
};

export function TextColorPopover({
  editor,
  activeTextColor,
  activeHighlightColor,
  onPushRecent,
}: Props) {
  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className="flex flex-col gap-6 p-2"
    >
      <AppliedStyleSection
        activeTextColor={activeTextColor}
        activeHighlightColor={activeHighlightColor}
      />

      <TextColorSection
        editor={editor}
        activeTextColor={activeTextColor}
        onPushRecent={onPushRecent}
      />

      <HighlightColorSection
        editor={editor}
        activeHighlightColor={activeHighlightColor}
        onPushRecent={onPushRecent}
      />
    </div>
  );
}
