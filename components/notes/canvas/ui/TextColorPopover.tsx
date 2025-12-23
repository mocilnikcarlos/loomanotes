"use client";

import type { Editor } from "@tiptap/react";
import { RecentColor } from "./popovertoolbar/types";
import { AppliedStyleSection } from "./popovertoolbar/AppliedStyleSection";
import { TextColorSection } from "./popovertoolbar/TextColorSection";
import { HighlightColorSection } from "./popovertoolbar/HighlightColorSection";

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
      className="w-64 rounded-xl bg-card border border-border p-3 flex flex-col gap-4"
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
