"use client";

import { useEffect, useRef } from "react";
import SplitFlapBoard from "~/components/annnimate/split-flap-board";

// All lines padded to the 12 columns of ME@KEDRY.DEV so the board never
// resizes between sets.
const SETS = [
  [" LET'S TALK "],
  ["ME@KEDRY.DEV"],
  ["REPLY IN 24H"],
  ["SEATTLE · WA"],
];

const AUTOPLAY_MS = 4200;

interface BoardHandle {
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
  demo: () => unknown;
}

export default function ContactBoard() {
  const boardRef = useRef<BoardHandle | null>(null);
  const hovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!hovering.current) boardRef.current?.next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
    >
      <SplitFlapBoard ref={boardRef} sets={SETS} />
    </div>
  );
}
