"use client";

import { motion, useAnimate, AnimationPlaybackControls } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMeasure } from "react-use";

export default function Ticker({
  duration,
  direction,
  pause,
  children,
}: {
  duration: number;
  direction: "up" | "down";
  pause: boolean;
  children?: React.ReactNode;
}) {
  const [scope, animate] = useAnimate();
  const [ref, { height }] = useMeasure<HTMLUListElement>();

  useEffect(() => {
    if (height !== 0) {
      if (pause) {
        animate(scope.current, {
          y: direction === "down" ? 0 : (height / 2) * -1,
          transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          },
        }).pause();
      } else {
      }
    }
  });

  return (
    <React.Fragment>
      {height !== 0 ? (
        <motion.div
          ref={scope}
          animate={{
            y: direction === "down" ? 0 : (height / 2) * -1,
            transition: {
              duration: duration,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          initial={{ y: direction === "down" ? (height / 2) * -1 : 0 }}
        >
          <ul className="flex flex-col gap-10">
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
