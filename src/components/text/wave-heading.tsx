"use client";

import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

// Annnimate-style text fill wave: the headline starts dim, then a bright
// accent band sweeps through the letters and they settle into their final
// color. Words stay unbreakable and lines wrap naturally — nothing is
// hard-broken. Runs on page enter (the site's pages don't scroll, so there
// is no scroll position to ride).
export default function WaveHeading({
  text,
  className,
  fill = "#FAFAFA",
  accent = "#FFB053",
  base = "rgba(250, 250, 250, 0.14)",
}: {
  text: string;
  className?: string;
  fill?: string;
  accent?: string;
  base?: string;
}) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root == null) return;

    const chars = root.querySelectorAll("[data-char]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(chars, { color: fill });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.15 });
      timeline
        .set(chars, { color: base })
        .to(
          chars,
          { color: accent, duration: 0.16, ease: "none", stagger: 0.03 },
          0,
        )
        .to(
          chars,
          { color: fill, duration: 0.34, ease: "power1.out", stagger: 0.03 },
          0.12,
        );
    }, root);

    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill, accent, base, text]);

  const words = text.split(" ");

  return (
    <h1 ref={rootRef} aria-label={text} className={className}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {[...word].map((char, charIndex) => (
              <span
                key={charIndex}
                data-char
                className="inline-block"
                style={{ color: base }}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </h1>
  );
}
