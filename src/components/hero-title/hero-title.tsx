"use client";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function HeroTitle() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="min-w-0 flex-1 overflow-hidden lg:w-[900px] lg:flex-none lg:overflow-visible">
      <h1 className="whitespace-nowrap text-left text-xl font-black text-text lg:whitespace-normal lg:text-5xl">
        {reducedMotion ? (
          "Hello, I'm Kevin."
        ) : (
          <TypeAnimation
            sequence={[
              "Hello, I'm Kevin 👋.",
              1600,
              "नमस्ते, मैं केविन हूं। 🙏",
              1600,
              "你好，我是凯文 🙌。",
              1600,
              "Hola, soy Kevin ✨.",
              1600,
              "こんにちは、ケビンです ✌️。",
              1600,
              "אהלן, אני קווין 👌.",
              1600,
            ]}
            speed={10}
            repeat={Infinity}
          />
        )}
      </h1>
    </div>
  );
}
