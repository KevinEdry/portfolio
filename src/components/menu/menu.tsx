"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";

const ITEMS = [
  { name: "about", route: "/" },
  { name: "blog", route: "/blog" },
  { name: "books", route: "/books" },
  { name: "oss", route: "/oss" },
  { name: "contact", route: "/contact" },
];

export default function Menu() {
  const route = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // One-time chrome entrance: the navbar drops in from the top on load.
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (nav == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      nav,
      { y: -24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
        clearProps: "transform,opacity,visibility",
      },
    );
  }, []);

  // The soft highlight pill glides under the active item on every route
  // change (and tracks it through resizes).
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (nav == null || pill == null) return;

    const place = (animate: boolean) => {
      const active = nav.querySelector<HTMLElement>("[data-active]");
      if (active == null) return;
      const target = {
        x: active.offsetLeft,
        width: active.offsetWidth,
        autoAlpha: 1,
      };
      if (
        !animate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(pill, target);
      } else {
        gsap.to(pill, { ...target, duration: 0.5, ease: "power3.out" });
      }
    };

    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [route]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="glass relative rounded-full px-1.5 py-1.5"
    >
      <span
        ref={pillRef}
        aria-hidden
        className="absolute inset-y-1.5 left-0 rounded-full bg-primary/15 opacity-0"
      />
      <ul className="relative flex items-center gap-0.5 lg:gap-1">
        {ITEMS.map((item) => (
          <MenuItem
            key={item.route}
            active={route === item.route}
            name={item.name}
            route={item.route}
          />
        ))}
      </ul>
    </nav>
  );
}
