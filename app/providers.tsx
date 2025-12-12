"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import { X } from "lucide-react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ToastProvider
          toastProps={{
            radius: "md",
            variant: "flat",
            timeout: 3000,
            hideIcon: true,
            closeIcon: <X size={16} />,
            classNames: {
              base: "px-6 py-3 bg-card text-foreground border border-border shadow-md",
              closeButton:
                "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 text-icon hover:text-foreground",
              title: "font-semibold text-foreground",
              description: "text-subtitle",
            },
          }}
        />

        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
