"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

// Rising-stats style counter: the number climbs to its value on mount. The
// real value is in the DOM from SSR.
export default function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const proxy = { n: 0 };
    const tween = gsap.to(proxy, {
      n: value,
      duration: 1.4,
      delay: 0.4,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = String(Math.round(proxy.n));
      },
    });
    return () => {
      tween.kill();
      el.textContent = String(value);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
