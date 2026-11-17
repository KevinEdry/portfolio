"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "~/providers/NavigationProvider";

// A luminous gradient field in place of a photo: soft peach, sky, and
// lavender pools on a warm near-white ground. The canvas renders 140% tall
// and glides one slice per route — warm light up top on /, cooler pools by
// /contact — so navigation still travels through the background.
const PAN_RANGE = 0.3;
const CANVAS_HEIGHT = 1.4;

const FIELD = `
  radial-gradient(42% 30% at 18% 10%, rgba(255, 176, 83, 0.4), transparent 70%),
  radial-gradient(50% 34% at 85% 20%, rgba(125, 170, 255, 0.33), transparent 70%),
  radial-gradient(44% 32% at 68% 52%, rgba(255, 140, 160, 0.2), transparent 70%),
  radial-gradient(42% 30% at 20% 72%, rgba(170, 140, 255, 0.24), transparent 70%),
  radial-gradient(46% 30% at 80% 88%, rgba(120, 200, 230, 0.28), transparent 70%),
  linear-gradient(180deg, #FBF9F6 0%, #F4F2ED 55%, #EDEFF6 100%)
`;

// Slow-drifting bokeh blobs keep the field alive: each wanders on its own
// 18–30s loop, so the light behind the glass never sits still.
const BLOBS = [
  { className: "left-[8%] top-[6%] h-[34rem] w-[34rem] bg-[#FFB053]/35" },
  { className: "right-[4%] top-[14%] h-[30rem] w-[30rem] bg-[#7DAAFF]/30" },
  { className: "left-[46%] top-[42%] h-[26rem] w-[26rem] bg-[#FF8CA0]/20" },
  { className: "left-[6%] bottom-[8%] h-[28rem] w-[28rem] bg-[#AA8CFF]/25" },
  { className: "right-[10%] bottom-[4%] h-[30rem] w-[30rem] bg-[#78C8E6]/28" },
];

export default function PanoramicBackground() {
  const pathname = usePathname();
  const fieldRef = useRef<HTMLDivElement>(null);
  const base = pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;
  const routeIndex = Math.max(
    0,
    ROUTES.findIndex((route) => route === base),
  );
  const progress = routeIndex / (ROUTES.length - 1);
  const shift = (progress * PAN_RANGE * 100) / CANVAS_HEIGHT;

  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (field == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      field.querySelectorAll("[data-blob]").forEach((blob, index) => {
        gsap.to(blob, {
          x: index % 2 === 0 ? 60 : -70,
          y: index % 3 === 0 ? 50 : -60,
          scale: 1.12,
          duration: 18 + index * 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, field);

    return () => context.revert();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        ref={fieldRef}
        aria-hidden
        className="absolute inset-x-0 top-0 h-[140%] transition-transform duration-1000 ease-out motion-reduce:transition-none"
        style={{
          transform: `translateY(-${shift}%)`,
          background: FIELD,
        }}
      >
        {BLOBS.map((blob, index) => (
          <div
            key={index}
            data-blob
            className={`absolute rounded-full blur-3xl will-change-transform ${blob.className}`}
          />
        ))}
      </div>
    </div>
  );
}
