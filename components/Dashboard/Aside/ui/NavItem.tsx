"use client";

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ children, active, onClick }: NavItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`flex items-center gap-2 text-foreground rounded-full w-full px-4 py-3 text-sm transition-colors cursor-pointer select-none ${
        active ? "bg-button" : "hover:bg-button-hover"
      }`}
    >
      <span className="flex items-center truncate">{children}</span>
    </div>
  );
}
