"use client";

import { LayoutGroup, motion } from "framer-motion";

import Menu from "~/components/menu/menu";
import HeroTitle from "~/components/hero-title/hero-title";
import NavigationArrow from "~/components/navigation-arrow/navigation-arrow";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import PageAnimatePresence from "~/ui/page-animation-presence/page-animation-presence";
import { NavigationContext } from "~/providers/NavigationProvider";

export default function PageTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const inSplashScreen = pathname === "/";

  const variants = {
    splash: {
      opacity: 0,
      y: 0,
    },
    up: {
      y: 300,
      opacity: 0,
    },
    down: {
      y: -300,
      opacity: 0,
    },
  };

  const { direction } = useContext(NavigationContext);

  return (
    <React.Fragment>
      <div className="container mx-auto hidden h-full min-h-full flex-row overflow-hidden bg-cover font-roboto text-text sm:flex">
        <LayoutGroup id="hero">
          {inSplashScreen ? (
            children
          ) : (
            <React.Fragment>
              <Menu />
              <main className="flex h-full w-full flex-col">
                <div className="flex h-1/6 items-center">
                  <motion.div layoutId="hero" animate>
                    <HeroTitle />
                  </motion.div>
                </div>
                <PageAnimatePresence>
                  <motion.section
                    variants={variants}
                    initial={
                      direction === "up"
                        ? "down"
                        : direction === "down"
                          ? "up"
                          : "splash"
                    }
                    animate={{ y: 0, opacity: 1 }}
                    exit={direction}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex h-full items-center"
                  >
                    {children}
                  </motion.section>
                </PageAnimatePresence>
              </main>
              <div className="absolute bottom-32 right-0 flex flex-col">
                <NavigationArrow direction="up" />
                <NavigationArrow direction="down" />
              </div>
            </React.Fragment>
          )}
        </LayoutGroup>
      </div>
      <div className="container mx-auto flex h-full flex-col flex-nowrap items-center justify-center gap-3 overflow-hidden p-10 font-roboto text-text sm:hidden">
        <h1 className="mt-auto text-6xl font-extrabold">Please...</h1>
        <hr className="w-32 text-primary" />
        <p className="text-center text-3xl">
          I’m an
          <span className="font-bold"> Engineering Manager</span>, Do I look
          like I spend my days tweaking CSS?
        </p>
        <div className="text-6xl">😂</div>
        <div className="mt-auto text-center text-text/70">
          I just didn&apos;t have the time to implement it, I actually like
          tweaking CSS all day.
        </div>
      </div>
    </React.Fragment>
  );
}
