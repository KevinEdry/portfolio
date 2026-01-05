"use client";

import React from "react";
import { usePathname } from "next/navigation";

// This is a workaround for the routes transition issue: https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion/77715364#77715364

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="flex h-full w-full flex-col">
      <div
        key={pathname}
        className="page-content z-10 flex h-full w-full flex-1 items-center"
      >
        {children}
      </div>
    </main>
  );
}
