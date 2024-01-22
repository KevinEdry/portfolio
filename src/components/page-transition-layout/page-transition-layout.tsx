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
    <div className="container mx-auto flex h-full min-h-full flex-row overflow-hidden bg-cover font-roboto text-text">
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
  );
}
