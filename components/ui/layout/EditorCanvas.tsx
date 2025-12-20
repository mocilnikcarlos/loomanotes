"use client";

import { PropsWithChildren } from "react";

export function EditorCanvas({ children }: PropsWithChildren) {
  return <div className="editor-canvas w-full">{children}</div>;
}
