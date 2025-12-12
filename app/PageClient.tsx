"use client";

import { useT } from "@/hooks/utils/useT";

export default function PageClient() {
  const { t } = useT();
  return <h1>{t("dashboard.hello")}</h1>;
}
