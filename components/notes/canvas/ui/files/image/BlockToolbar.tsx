type BlockToolbarAction = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type Props = {
  actions: BlockToolbarAction[];
};

export function BlockToolbar({ actions }: Props) {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-md bg-card/90 backdrop-blur border border-border shadow-sm opacity-0 group-hover:opacity-100 transition">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          title={action.label}
          className="p-2 rounded hover:bg-muted"
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
