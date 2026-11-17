"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { ROUTES } from "~/providers/NavigationProvider";

// Editorial page counter, bottom-left: a big ghost number that rolls like a
// counter wheel on every route change.
export default function PageNumber() {
  const pathname = usePathname();
  const numberRef = useRef<HTMLSpanElement>(null);

  const base = pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;
  const routeIndex = Math.max(
    0,
    ROUTES.findIndex((route) => route === base),
  );
  const label = String(routeIndex + 1).padStart(2, "0");
  const [shown, setShown] = useState(label);

  useLayoutEffect(() => {
    const el = numberRef.current;
    if (el == null || label === shown) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(label);
      return;
    }

    const timeline = gsap.timeline();
    timeline
      .to(el, {
        yPercent: -70,
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setShown(label),
      })
      .fromTo(
        el,
        { yPercent: 70, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      );
    return () => {
      timeline.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-8 z-10 hidden items-baseline gap-2 lg:flex"
    >
      <span className="block h-[0.78em] overflow-hidden text-7xl font-black leading-none tracking-tight">
        <span ref={numberRef} className="block text-text/15">
          {shown}
        </span>
      </span>
      <span className="text-sm font-medium tracking-[0.2em] text-text-muted">
        / {String(ROUTES.length).padStart(2, "0")}
      </span>
    </div>
  );
}
