import { getAside } from "@/lib/services/aside/getAside";
import { AsideClient } from "@/components/dashboard/aside/AsideClient";
import { AsideHeader } from "@/components/dashboard/aside/ui/AsideHeader";

export async function Aside() {
  const aside = await getAside();

  return (
    <aside className="w-[320px] shrink-0 p-4 pb-24">
      <AsideHeader />
      <AsideClient aside={aside} />
    </aside>
  );
}
