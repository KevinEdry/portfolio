import "~/styles/globals.css";
import "~/styles/reset.css";

import Image from "next/image";
import { LayoutGroup } from "framer-motion";

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
      <body>
        <Image src="/images/background.png" alt="Seattle Skyline" layout="fill" objectFit="cover" objectPosition="center" className="-z-10"/>
        <div className="container mx-auto flex flex-row font-roboto min-h-full h-full bg-cover text-text overflow-hidden">
            {children}
        </div>
      </body>
    </html>
  );
}