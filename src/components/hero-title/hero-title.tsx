"use client";

import { clsx } from "clsx";
import { TypeAnimation } from "react-type-animation";

export default function HeroTitle() {
  return (
    <div className={clsx("w-[900px]")}>
      <h1 className="font-roboto text-6xl font-black text-text">
        <TypeAnimation
          sequence={[
            "Hello, I'm Kevin 👋.",
            1000,
            "नमस्ते, मैं केविन हूं। 🙏",
            1000,
            "你好，我是凯文 🙌。",
            1000,
            "Hola, soy Kevin ✨.",
            1000,
            "こんにちは、ケビンです ✌️。",
            1000,
            "אהלן, אני קווין 👌.",
            1000,
          ]}
          speed={10}
          repeat={Infinity}
        />
      </h1>
    </div>
  );
}
