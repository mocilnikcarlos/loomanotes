// editor/hooks/useBlockDragGhost.ts
"use client";

export function useBlockDragGhost() {
  function onDragStartGhost(el: HTMLElement, event: DragEvent) {
    const rect = el.getBoundingClientRect();

    const ghost = el.cloneNode(true) as HTMLElement;
    ghost.style.position = "fixed";
    ghost.style.top = `${rect.top}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.pointerEvents = "none";
    ghost.style.zIndex = "9999";
    ghost.style.opacity = "0.95";
    ghost.style.transform = "scale(1.02)";
    ghost.style.boxShadow = "0 12px 40px rgba(0,0,0,0.45)";
    ghost.style.borderRadius = "8px";

    document.getElementById("editor-drag-ghost-root")?.appendChild(ghost);

    const offsetY = event.clientY - rect.top;

    function onDrag(e: DragEvent) {
      if (!e.clientY) return;
      ghost.style.top = `${e.clientY - offsetY}px`;
    }

    function onEnd() {
      ghost.remove();
      window.removeEventListener("drag", onDrag);
      window.removeEventListener("dragend", onEnd);
    }

    window.addEventListener("drag", onDrag);
    window.addEventListener("dragend", onEnd);
  }

  return { onDragStartGhost };
}
