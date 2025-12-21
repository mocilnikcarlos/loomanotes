export type SlashMenuContext = {
  editor: any;
  range: { from: number; to: number };
  coords: { top: number; left: number };
};

let openFn: ((ctx: SlashMenuContext) => void) | null = null;

export function registerSlashMenu(fn: (ctx: SlashMenuContext | null) => void) {
  openFn = fn;
}

export function openSlashMenu(ctx: SlashMenuContext) {
  openFn?.(ctx);
}
