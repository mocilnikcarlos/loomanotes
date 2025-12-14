interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ children, active, onClick }: NavItemProps) {
  return (
    <button
      className={`flex items-center gap-2 text-foreground rounded-full w-full px-6 py-2 text-sm transition-colors cursor-pointer ${
        active ? "bg-button " : "hover:bg-button-hover"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center">{children}</span>
    </button>
  );
}
