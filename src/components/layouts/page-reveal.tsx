"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

// Annnimate-style staggered entrance on every route change: the incoming
// page's top-level content blocks rise in sequence. One tuned timeline,
// GSAP-driven, SSR-safe, honors prefers-reduced-motion.
export default function PageReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (stage == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = stage.firstElementChild;
    if (root == null) return;
    const blocks = root.children.length > 1 ? [...root.children] : [root];

    const context = gsap.context(() => {
      gsap.fromTo(
        blocks,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          clearProps: "transform,opacity,visibility",
        },
      );
    }, stage);

    return () => context.revert();
  }, [pathname]);

  return (
    <div ref={stageRef} className="flex min-h-full w-full flex-1">
      {children}
    </div>
  );
}
