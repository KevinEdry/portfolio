"use client";

import TwitterIcon from "~/public/icons/social/twitter.svg";
import GithubIcon from "~/public/icons/social/github.svg";
import MediumIcon from "~/public/icons/social/medium.svg";
import LinkedinIcon from "~/public/icons/social/linkedin.svg";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Social(props: {
  platform: "twitter" | "github" | "medium" | "linkedin";
  link: string;
  animationDelay: number;
}) {
  const { platform, link, animationDelay } = props;
  return (
    <AnimatePresence>
      <motion.li
        initial={{ scale: 1, opacity: 0, x: 200 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: animationDelay,
          },
        }}
        whileHover={{ scale: 1.2 }}
        className="opacity-0"
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          {platform === "github" ? (
            <GithubIcon />
          ) : platform === "linkedin" ? (
            <LinkedinIcon />
          ) : platform === "medium" ? (
            <MediumIcon />
          ) : (
            <TwitterIcon />
          )}
        </a>
      </motion.li>
    </AnimatePresence>
  );
}
