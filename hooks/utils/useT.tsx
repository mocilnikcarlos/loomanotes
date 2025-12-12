"use client";

import { useTranslations } from "next-intl";

export function useT() {
  const t = useTranslations();
  return { t };
}
