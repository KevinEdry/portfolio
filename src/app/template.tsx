"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { NavigationContext } from "~/providers/NavigationProvider";

// This is a workaround for the routes transition issue: https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion/77715364#77715364

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const variants = {
    up: {
      y: 300,
      opacity: 0,
    },
    down: {
      y: -300,
      opacity: 0,
    },
    fade: {
      opacity: 0,
      zIndex: 300,
    },
  };

  const { direction } = useContext(NavigationContext);

  return (
    <main className="flex h-full w-full flex-col">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          layout="size"
          variants={variants}
          initial={
            direction === "up" ? "down" : direction === "down" ? "up" : "fade"
          }
          animate={{
            y: 0,
            opacity: 1,
            width: "100%",
            height: "100%",
          }}
          exit={direction}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex h-full w-full flex-1 items-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
