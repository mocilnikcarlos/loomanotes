"use client";

import type { Editor } from "@tiptap/react";
import { RecentColor } from "./popovertoolbar/types";
import { AppliedStyleSection } from "./popovertoolbar/AppliedStyleSection";
import { RecentlyUsedSection } from "./popovertoolbar/RecentlyUsedSection";
import { TextColorSection } from "./popovertoolbar/TextColorSection";
import { HighlightColorSection } from "./popovertoolbar/HighlightColorSection";

type Props = {
  editor: Editor;
  recentColors: RecentColor[];
  activeTextColor: string | null;
  activeHighlightColor: string | null;
  onPushRecent: (entry: RecentColor) => void;
  onSelect?: () => void;
};

export function TextColorPopover({
  editor,
  recentColors,
  activeTextColor,
  activeHighlightColor,
  onPushRecent,
  onSelect,
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

      {/* <RecentlyUsedSection
        editor={editor}
        recentColors={recentColors}
        activeTextColor={activeTextColor}
        activeHighlightColor={activeHighlightColor}
        onSelect={onSelect}
      /> */}

      <TextColorSection
        editor={editor}
        onPushRecent={onPushRecent}
        onSelect={onSelect}
      />

      <HighlightColorSection
        editor={editor}
        onPushRecent={onPushRecent}
        onSelect={onSelect}
      />
    </div>
  );
}
