import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontComfortaa } from "@/config/fonts";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Looma",
  description: "Notas personales",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen w-full antialiased font-comfortaa bg-background text-foreground",
          fontComfortaa.variable
        )}
      >
        <NextIntlClientProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
