import "~/styles/globals.css";
import "~/styles/reset.css";

import Image from "next/image";

import Menu from "~/components/menu/menu";
import HeroTitle from "~/components/hero-title/hero-title";
import NavigationArrow from "~/components/navigation-arrow/navigation-arrow";

export const metadata = {
  title: "Kevin Edry's Portfolio",
  description: "Crafted with <3 in Seattle.",
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
        <Image src="/images/background.png" alt="Seattle" layout="fill" objectFit="cover" objectPosition="center" className="-z-10"/>
        <div className="flex flex-row font-roboto min-h-full h-full bg-hero bg-cover text-text overflow-hidden">
          <nav className="flex flex-col w-1/12 h-full justify-center pb-10">
              <Menu />
          </nav>
          <main className="flex flex-col w-full h-full">
              <section className="h-1/6 flex items-center w-full">
                <HeroTitle />
              </section>
              {children}
          </main>
          <div className="flex flex-col absolute right-0 bottom-32">
              <NavigationArrow direction="right"/>
              <NavigationArrow direction="left"/>
          </div>
      </div>
      </body>
    </html>
  );
}