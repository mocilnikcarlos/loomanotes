// components/Dashboard/Aside/Aside.tsx
import { getAside } from "@/lib/services/aside/getAside";
import { AsideClient } from "./AsideClient";
import { AsideHeader } from "./ui/AsideHeader";

export async function Aside() {
  const aside = await getAside();

  return (
    <aside className="w-[320px] shrink-0 p-4 pb-24">
      <AsideHeader />
      <AsideClient aside={aside} />
    </aside>
  );
}
