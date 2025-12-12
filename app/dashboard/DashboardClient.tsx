// app/dashboard/DashboardClient.tsx
"use client";

import { LogoutButton } from "@/components/auth/logout/ui/LogoutButton";
import { useT } from "@/hooks/utils/useT";
import { addToast, Button } from "@heroui/react";

export default function DashboardClient() {
  const { t } = useT();
  return (
    <div>
      {t("dashboard.hello")} <LogoutButton />
      <Button color="primary">Botón</Button>
      <Button
        onPress={() =>
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
