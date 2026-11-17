"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

// Cinematic page entrance: the incoming page's content blocks rise out of a
// soft blur in sequence while accent rules draw themselves in. One tuned
// GSAP timeline, SSR-safe, honors prefers-reduced-motion.
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
    const rules = root.querySelectorAll("hr");

    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.fromTo(
        blocks,
        { y: 28, autoAlpha: 0, filter: "blur(10px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform,opacity,visibility,filter",
        },
        0,
      );
      if (rules.length > 0) {
        timeline.fromTo(
          rules,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            stagger: 0.1,
            clearProps: "transform",
          },
          0.25,
        );
      }
    }, stage);

    return () => context.revert();
  }, [pathname]);

  return (
    <div ref={stageRef} className="flex min-h-full w-full flex-1">
      {children}
    </div>
  );
}
