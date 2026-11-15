import "~/styles/reset.css";
import "~/styles/globals.css";

import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";

import { AppProviders } from "~/providers/AppProviders";
import DesktopLayout from "~/components/layouts/desktop-layout";

const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto-Thin.ttf", weight: "100" },
    { path: "../../public/fonts/Roboto-Light.ttf", weight: "300" },
    { path: "../../public/fonts/Roboto-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Roboto-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Roboto-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/Roboto-Black.ttf", weight: "900" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kevin-edry.com"),
  title: {
    default: "Kevin Edry — Entrepreneur, Manager, Engineer",
    template: "%s · Kevin Edry",
  },
  description:
    "Entrepreneur, manager, and engineer in Seattle — building products and the teams that ship them, and writing about how engineering teams actually work.",
  openGraph: {
    type: "website",
    url: "https://kevin-edry.com",
    siteName: "Kevin Edry",
    title: "Kevin Edry — Entrepreneur, Manager, Engineer",
    description:
      "Entrepreneur, manager, and engineer in Seattle — building products and the teams that ship them, and writing about how engineering teams actually work.",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={roboto.variable}>
        <body className="font-sans overflow-auto lg:overflow-hidden">
          <AppProviders>
            <div className="fixed inset-0 -z-10">
              <Image
                src="/images/background.png"
                alt=""
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-image/30"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/60"></div>
            </div>
            <DesktopLayout>{children}</DesktopLayout>
          </AppProviders>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
