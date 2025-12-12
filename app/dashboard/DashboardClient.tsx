"use client";

import { LogoutButton } from "@/components/auth/logout/ui/LogoutButton";
import { useT } from "@/hooks/utils/useT";
import { addToast } from "@heroui/react";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

export default function DashboardClient() {
  const { t } = useT();
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      {t("dashboard.hello")} <LogoutButton />
      <Button>{t("dashboard.hello")}</Button>
      <Button variant="secondary" icon={<X size={16} />} />
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
    </div>
  );
}
