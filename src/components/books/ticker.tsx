"use client";

import React, { useEffect, useState } from "react";
import { useMeasure } from "react-use";

const LIST_GAP_PX = 40;

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
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (height !== 0) {
      setMeasuredHeight(height);
    }
  }, [height]);

  const animationName = direction === "up" ? "ticker-up" : "ticker-down";

  // The list is rendered twice so the loop wraps seamlessly; the second copy
  // is decoration only.
  return (
    <div
      className="flex w-fit flex-col gap-10"
      style={
        measuredHeight !== 0
          ? {
              ["--ticker-height" as string]: `${measuredHeight + LIST_GAP_PX}px`,
              animation: `${animationName} ${duration}s linear infinite`,
              animationPlayState: pause ? "paused" : "running",
            }
          : undefined
      }
    >
      <ul ref={ref} className="flex flex-col gap-10">
        {children}
      </ul>
      <ul aria-hidden className="flex flex-col gap-10">
        {children}
      </ul>
    </div>
  );
}
