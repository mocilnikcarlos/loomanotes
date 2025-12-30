"use client";

import { useState } from "react";

type Params = {
  width: string;
  onCommit: (width: string) => void;
  min?: number;
  max?: number;
};

export function useImageResize({
  width,
  onCommit,
  min = 30,
  max = 100,
}: Params) {
  const [tempWidth, setTempWidth] = useState<string | null>(null);

  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = (e.currentTarget.parentElement as HTMLElement)
      .offsetWidth;

    const parentWidth =
      e.currentTarget.closest(".looma-block")?.parentElement?.offsetWidth ??
      startWidth;

    let nextWidth = width;

    const onMouseMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const nextPx = startWidth + delta;

      const percent = Math.min(
        max,
        Math.max(min, (nextPx / parentWidth) * 100)
      );

      nextWidth = `${percent}%`;
      setTempWidth(nextWidth);
    };

    const onMouseUp = () => {
      onCommit(nextWidth);
      setTempWidth(null);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return {
    width: tempWidth ?? width,
    onResizeStart,
    isResizing: tempWidth !== null,
  };
}
