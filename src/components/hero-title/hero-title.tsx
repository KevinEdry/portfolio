"use client";

import { clsx } from "clsx";
import { TypeAnimation } from "react-type-animation";

export default function HeroTitle() {
  return (
    <div className="w-full lg:w-[900px]">
      <h1 className="text-center font-roboto text-2xl font-black text-text lg:text-left lg:text-6xl">
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
