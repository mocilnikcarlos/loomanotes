"use client";

import { DragDropContext } from "@hello-pangea/dnd";

export function AsideDndProvider({
  children,
  onDragEnd,
  onDragStart,
}: {
  children: React.ReactNode;
  onDragEnd: (result: any) => void;
  onDragStart?: (start: any) => void;
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  );
}
