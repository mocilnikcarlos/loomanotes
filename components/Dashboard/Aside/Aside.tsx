import { AsideHeader } from "./ui/AsideHeader";
import { AsideCard } from "./ui/AsideCard";
import { AsideSection } from "./ui/AsideSection";
import { NavGroup } from "./ui/NavGroup";
import { NavItem } from "./ui/NavItem";
import { AsideDivider } from "./ui/AsideDivider";
import { cn } from "@/utils/cn"; // Usamos esto para ayudar con las clases

export function Aside() {
  return (
    <aside className="w-[320px] shrink-0 p-4 pb-24">
      {/* Header */}
      <AsideHeader />

      {/* Card */}
      <AsideCard>
        {/* Section 1 */}
        <AsideSection>
          <NavGroup title="Personal management">
            <NavItem active>My Week Timeline</NavItem>
            <NavItem>News Article</NavItem>
            <NavItem>Usage Chat Project</NavItem>
          </NavGroup>
        </AsideSection>

        <AsideDivider />

        {/* Section 2 */}
        <AsideSection>
          <NavGroup title="Projects">
            <NavItem>Digital Art Event</NavItem>
            <NavItem>Jazz Crew</NavItem>
            <NavItem>Trip to Europe</NavItem>
          </NavGroup>
        </AsideSection>
      </AsideCard>
    </aside>
  );
}
