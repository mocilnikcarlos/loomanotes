"use client";

import { LogoutButton } from "@/components/auth/logout/ui/LogoutButton";
import { useT } from "@/hooks/utils/useT";
import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/layout/Section";

export default function DashboardPageClient() {
  const { t } = useT();

  return (
    <Section className="min-h-[1080px]">
      <Card className="flex w-full flex-col items-center justify-center gap-4">
        <div className=" flex flex-col items-center gap-4">
          <p>Contenido card</p>
          <span>{t("dashboard.hello")}</span>
        </div>
        <LogoutButton />

        <div className="flex flex-col gap-4 items-center justify-center w-full">
          {/* LG */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="lg" variant="primary">
              Primary
            </Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="ghost">
              Ghost
            </Button>
          </div>

          {/* MD */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="md" variant="primary">
              Primary
            </Button>
            <Button size="md" variant="secondary">
              Secondary
            </Button>
            <Button size="md" variant="ghost">
              Ghost
            </Button>
          </div>

          {/* SM */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
          </div>

          {/* ICONS */}
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex gap-4">
              <Button size="md" variant="primary" icon={<X size={16} />} />
              <Button size="md" variant="secondary" icon={<X size={16} />} />
              <Button size="md" variant="ghost" icon={<X size={16} />} />
            </div>
          </div>
        </div>
        {/* TOAST */}
        <Button
          variant="ghost"
          onClick={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
            })
          }
        >
          Toast
        </Button>
        {/* ICONS */}
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="lg" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="lg" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="lg" icon={<X size={16} />} />
          </div>
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="md" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="md" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="md" icon={<X size={16} />} />
          </div>
          <div className="flex gap-4 items-center justify-center w-full">
            <ButtonIcon variant="primary" size="sm" icon={<X size={16} />} />
            <ButtonIcon variant="secondary" size="sm" icon={<X size={16} />} />
            <ButtonIcon variant="ghost" size="sm" icon={<X size={16} />} />
          </div>
        </div>
        {/* Pills */}
        <div className="flex flex-col gap-4 items-center justify-center w-full pt-6">
          {/* MD */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill>Updated 2h ago</Pill>
            <Pill
              leading={<span className="h-2 w-2 rounded-full bg-green-400" />}
            >
              Active
            </Pill>
            <Pill leading={<X size={12} />}>With icon</Pill>
          </div>

          {/* SM */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill size="sm">Updated 2h ago</Pill>
            <Pill
              size="sm"
              leading={
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              }
            >
              Active
            </Pill>
            <Pill size="sm" leading={<X size={10} />}>
              With icon
            </Pill>
          </div>

          {/* Dynamic / component */}
          <div className="flex gap-4 items-center justify-center w-full">
            <Pill
              leading={<span className="h-2 w-2 rounded-full bg-emerald-400" />}
            >
              Rendering…
            </Pill>
          </div>
        </div>
      </Card>
      <Card>OTRO CONTENIDO CARD</Card>
    </Section>
  );
}
