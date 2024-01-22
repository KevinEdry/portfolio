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
            y: 0
        },
        up: {
            y: 300, 
            opacity: 0
        },
        down: {
            y: -300, 
            opacity: 0
        }
    }

    const { direction } = useContext(NavigationContext);

  return (
    <div className="container mx-auto flex flex-row font-roboto min-h-full h-full bg-cover text-text overflow-hidden">
        <LayoutGroup id="hero">
        {
            inSplashScreen ? 
            children
            :
            <React.Fragment>
                <Menu />
                <main className="flex flex-col w-full h-full">
                <motion.div layoutId='hero' animate className="h-1/6 flex items-center w-full">
                    <HeroTitle />
                </motion.div>
                <PageAnimatePresence>
                    <motion.section variants={variants} initial={direction === "up" ? "down" : direction === "down" ? "up" : "splash"}
                                    animate={{ y: 0, opacity: 1}}
                                    exit={direction}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }} className="flex items-center h-full">
                        {children}
                    </motion.section>
                </PageAnimatePresence>
                </main>
                <div className="flex flex-col absolute right-0 bottom-32">
                    <NavigationArrow direction="up"/>
                    <NavigationArrow direction="down"/>
                </div>
            </React.Fragment>
        }
    </LayoutGroup>
    </div>
  );
}
