import "~/styles/reset.css";
import "~/styles/globals.css";

import Image from "next/image";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";

import { AppProviders } from "~/providers/AppProviders";
import DesktopLayout from "~/components/layouts/desktop-layout";

export const metadata = {
  title: "Kevin Edry's Portfolio",
  description: "Crafted with ❤️ in Seattle.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="font-sans overflow-auto lg:overflow-hidden">
          <AppProviders>
            <div className="fixed inset-0 -z-10">
              <Image
                src="/images/background.png"
                alt="Seattle Skyline"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-image/20"></div>
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
