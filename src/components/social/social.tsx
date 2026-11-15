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
}) {
  const { platform, link } = props;
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kevin on ${PLATFORM_LABELS[platform]}`}
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
