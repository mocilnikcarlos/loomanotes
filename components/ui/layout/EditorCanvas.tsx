"use client";

import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export function EditorCanvas({ children }: PropsWithChildren) {
  return <div className="editor-canvas w-full">{children}</div>;
}
