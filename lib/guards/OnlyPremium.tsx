"use client";

import { ReactNode } from "react";
import { usePlanCapabilities } from "@/lib/plan/usePlanCapabilities";

type Props = {
  children: ReactNode;
};

export function OnlyPremium({ children }: Props) {
  const { isPremium } = usePlanCapabilities();

  if (!isPremium) return null;

  return <>{children}</>;
}
