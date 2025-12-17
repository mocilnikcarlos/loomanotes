"use client";

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

export function NavGroup({ title, children }: NavGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-wide text-subtitle">
        {title}
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
