"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "~/providers/NavigationProvider";

// One continuous skyline: the photo renders 140% tall and glides one slice
// further down the city for each route, so navigating travels through the
// panorama. Plain CSS transition — no animation library.

// The pan never reaches the photo's bottom edge, where a caption is baked in.
const PAN_RANGE = 0.3;
const CANVAS_HEIGHT = 1.4;

export default function PanoramicBackground() {
  const pathname = usePathname();
  const base = pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;
  const routeIndex = Math.max(
    0,
    ROUTES.findIndex((route) => route === base),
  );
  const progress = routeIndex / (ROUTES.length - 1);
  const shift = (progress * PAN_RANGE * 100) / CANVAS_HEIGHT;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[140%] transition-transform duration-1000 ease-out motion-reduce:transition-none"
        style={{ transform: `translateY(-${shift}%)` }}
      >
        <Image
          src="/images/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div className="absolute inset-0 bg-image/20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background/45"></div>
    </div>
  );
}
