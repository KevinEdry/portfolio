"use client";

import { motion } from "framer-motion";
import React from "react";
import { useMeasure } from "react-use";

export default function Ticker({
  duration,
  direction,
  children,
}: {
  duration: number;
  direction: "up" | "down";
  children?: React.ReactNode;
}) {
  const [ref, { height }] = useMeasure<HTMLUListElement>();

  return (
    <React.Fragment>
      {height !== 0 ? (
        <motion.div
          animate={{
            y: direction === "down" ? 0 : (height / 2) * -1,
          }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{ y: direction === "down" ? (height / 2) * -1 : 0 }}
        >
          <ul ref={ref} className="flex flex-col gap-10">
            {children}
            {children}
          </ul>
        </motion.div>
      ) : (
        <div>
          <ul ref={ref} className="flex flex-col gap-10">
            {children}
            {children}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}
