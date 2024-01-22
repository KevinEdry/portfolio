import "~/styles/globals.css";
import "~/styles/reset.css";

import Image from "next/image";
import React from "react";

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
          <Image src="/images/background.png" alt="Seattle Skyline" layout="fill" objectFit="cover" objectPosition="center" className="-z-10"/>
          <PageTransitionLayout>{children}</PageTransitionLayout>
        </AppProviders>
      </body>
    </html>
  );
}