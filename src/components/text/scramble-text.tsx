"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useLayoutEffect, useRef } from "react";

// Annnimate-style dual scramble, mount-triggered: the text scrambles through
// the accent colour and settles into its final colour. The real text is in
// the DOM from SSR, so SEO and screen readers see the finished words.
export default function ScrambleText({
  text,
  className,
  delay = 0.2,
  accent = "#E8820C",
  fill = "#4A5068",
}: {
  text: string;
  className?: string;
  delay?: number;
  accent?: string;
  fill?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrambleTextPlugin);
    const timeline = gsap.timeline({ delay });
    timeline
      .set(el, { color: accent })
      .to(el, {
        duration: 1.1,
        scrambleText: {
          text,
          chars: "upperCase",
          speed: 0.9,
          revealDelay: 0.15,
        },
        ease: "none",
      })
      .to(el, { color: fill, duration: 0.4, ease: "power1.out" }, "-=0.2");

    return () => {
      timeline.kill();
      el.textContent = text;
      gsap.set(el, { clearProps: "color" });
    };
  }, [text, delay, accent, fill]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
