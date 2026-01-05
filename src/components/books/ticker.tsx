"use client";

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
  const [ref, { height }] = useMeasure<HTMLUListElement>();
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (height !== 0) {
      setMeasuredHeight(height);
    }
  }, [height]);

  const animationName = direction === "up" ? "ticker-up" : "ticker-down";

  return (
    <React.Fragment>
      {measuredHeight !== 0 ? (
        <div
          className="w-fit"
          style={{
            ["--ticker-height" as string]: `${measuredHeight / 2}px`,
            animation: `${animationName} ${duration}s linear infinite`,
            animationPlayState: pause ? "paused" : "running",
          }}
        >
          <ul className="flex flex-col gap-10">
            {children}
            {children}
          </ul>
        </div>
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
