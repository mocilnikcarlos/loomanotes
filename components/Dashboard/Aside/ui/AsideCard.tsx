import { cn } from "@/utils/cn";

export function AsideCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card min-h-full",
        "shadow-[0_5px_8px_-12px_rgba(0,0,0,0.35)]"
      )}
    >
      {children}
    </div>
  );
}
