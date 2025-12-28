"use client";
import { useT } from "@/hooks/utils/useT";
import { BlockMenuItem } from "./blockmenu/BlockMenuItem";

type Props = {
  items: any[];
  command: (item: any) => void;
};

export function SlashMenu({ items, command }: Props) {
  const { t } = useT();

  return (
    <>
      {items.map((item) => (
        <BlockMenuItem
          key={item.id}
          icon={item.icon}
          title={t(item.title)}
          description={t(item.description)}
          onSelect={() => command(item)}
        />
      ))}
    </>
  );
}
