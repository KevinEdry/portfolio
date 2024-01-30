"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
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
  const controls = useAnimation();
  const [ref, { height }] = useMeasure<HTMLUListElement>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startAnimation = () => {
    void controls.start({
      y: direction === "down" ? 0 : (height / 2) * -1,
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };
  useEffect(() => {
    if (height !== 0) {
      startAnimation();
      if (pause) {
        void controls.stop();
      }
    }
  }, [pause, height, startAnimation, controls]);

  return (
    <React.Fragment>
      {height !== 0 ? (
        <motion.div
          animate={controls}
          className="w-fit"
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
