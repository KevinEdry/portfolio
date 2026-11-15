import clsx from "clsx";
import TwitterIcon from "~/public/icons/social/twitter.svg";
import GithubIcon from "~/public/icons/social/github.svg";
import MediumIcon from "~/public/icons/social/medium.svg";
import LinkedinIcon from "~/public/icons/social/linkedin.svg";

const PLATFORM_LABELS = {
  twitter: "Twitter",
  github: "GitHub",
  medium: "Medium",
  linkedin: "LinkedIn",
} as const;

export default function Social(props: {
  platform: "twitter" | "github" | "medium" | "linkedin";
  link: string;
  animationDelay: number;
  small?: boolean;
}) {
  const { platform, link, animationDelay, small } = props;
  return (
    <li
      className={clsx(
        "animate-slide-in-from-right opacity-0 transition-transform hover:scale-120",
        small ? "h-5 w-5" : "",
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kevin on ${PLATFORM_LABELS[platform]}`}
        className={clsx("block", small && "[&>svg]:h-5 [&>svg]:w-5")}
      >
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
    </li>
  );
}
