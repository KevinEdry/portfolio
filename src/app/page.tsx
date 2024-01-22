"use client";

import React from "react";
import Social from "~/components/social/social";
import HeroTitle from "~/components/hero-title/hero-title";
import Link from "next/link";

import { motion } from "framer-motion";

export default function Splash() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <motion.div layoutId="hero" animate className="text-center">
              <HeroTitle />
            </motion.div>
          </div>
          <hr className="w-40 text-primary" />
          <p className="text-text/40">Senior Engineering Manager</p>
          <Link href={"/about"} className="pt-5">
            <button className="h-10 w-32 rounded-md bg-primary font-bold hover:bg-primary/90">
              ENTER
            </button>
          </Link>
        </div>
      </div>
      <motion.ul
        className="flex justify-center gap-8 pb-10"
        initial={{ opacity: 0, y: "5rem" }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          y: "-5rem",
        }}
      >
        <Social
          platform="linkedin"
          link="https://www.linkedin.com/in/kevinedry/"
        />
        <Social platform="github" link="https://github.com/KevinEdry" />
        <Social platform="medium" link="https://medium.com/@techg9" />
        <Social platform="twitter" link="https://twitter.com/KevinEdry" />
      </motion.ul>
    </div>
  );
}
