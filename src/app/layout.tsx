import "~/styles/globals.css";
import "~/styles/reset.css";

import Image from "next/image";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import PageTransitionLayout from "~/components/page-transition-layout/page-transition-layout";
import { AppProviders } from "~/providers/AppProviders";

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
    <html lang="en">
      <body className="overflow-hidden">
        <AppProviders>
          <Image
            src="/images/background.png"
            alt="Seattle Skyline"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="-z-10"
          />
          <div className="absolute -z-10 h-full w-full bg-image/20"></div>
          <PageTransitionLayout>{children}</PageTransitionLayout>
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
