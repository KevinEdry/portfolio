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
      <div className="container mx-auto flex h-full flex-col flex-nowrap items-center justify-center gap-3 overflow-hidden p-5 font-roboto text-text sm:hidden">
        <h1 className="mt-auto text-center text-3xl">
          <span className="font-extrabold">
            Leading with innovation,
            <br />
          </span>
          not just implementation
        </h1>
        <hr className="w-32 text-primary" />
        <p className="text-center text-lg">
          As an
          <span className="font-bold"> Engineering Manager</span>, I prioritize
          strategic leadership and team development over pixel-perfect layouts.
        </p>
        <div className="text-center text-text/70"></div>
        <div className="text-6xl">😎</div>
        <div className="mt-auto text-center text-text/70">
          A responsive design update is in the pipeline as I continuously
          improve the website. Stay tuned!
        </div>
      </div>
    </React.Fragment>
  );
}
