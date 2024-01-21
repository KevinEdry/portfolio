import Menu from "~/components/menu/menu";
import HeroTitle from "~/components/hero-title/hero-title";
import NavigationArrow from "~/components/navigation-arrow/navigation-arrow";
import React from "react";


export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
        
          <nav className="flex flex-col w-1/12 h-full justify-center pb-10">
              <Menu />
          </nav>
          <main className="flex flex-col w-full h-full">
              <section className="h-1/6 flex items-center w-full">
                <HeroTitle />
              </section>
              <section className="flex items-center h-full">
                {children}
              </section>
          </main>
          <div className="flex flex-col absolute right-0 bottom-32">
              <NavigationArrow direction="up"/>
              <NavigationArrow direction="down"/>
          </div>
    </React.Fragment>
  );
}