"use client";
import { BlockMenuItem } from "./blockmenu/BlockMenuItem";

type Props = {
  items: any[];
  command: (item: any) => void;
};

export function SlashMenu({ items, command }: Props) {
  return (
    <>
      {items.map((item) => (
        <BlockMenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          description={item.description}
          onSelect={() => command(item)}
        />
      ))}
    </>
  );
}
