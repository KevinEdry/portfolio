"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";

export default function Template({ children }: { children: React.ReactNode }) {
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
