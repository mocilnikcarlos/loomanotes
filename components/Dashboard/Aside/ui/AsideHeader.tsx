"use client";

export function AsideHeader() {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-foreground">
          LoomaNotes
        </span>

        <span className="text-xs text-subtitle">
          v{process.env.NEXT_PUBLIC_APP_VERSION}
        </span>
      </div>
    </div>
  );
}
