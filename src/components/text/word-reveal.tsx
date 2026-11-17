"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";

// Annnimate-style text reveal, mount-triggered: the line rises word by word.
export default function WordReveal({
  text,
  className,
  delay = 0.35,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(SplitText);
    const split = new SplitText(el, { type: "words" });
    const tween = gsap.from(split.words, {
      yPercent: 120,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.035,
      delay,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [text, delay]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
