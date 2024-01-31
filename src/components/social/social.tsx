import TwitterIcon from "~/public/icons/social/twitter.svg";
import GithubIcon from "~/public/icons/social/github.svg";
import MediumIcon from "~/public/icons/social/medium.svg";
import LinkedinIcon from "~/public/icons/social/linkedin.svg";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Social = forwardRef<
  HTMLLIElement,
  {
    platform: "twitter" | "github" | "medium" | "linkedin";
    link: string;
  }
>((props, ref) => {
  const { platform, link } = props;
  return (
    <motion.li
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      ref={ref}
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
  );
});

Social.displayName = "Social";

export default motion(Social);
