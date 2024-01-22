import TwitterIcon from "~/public/icons/social/twitter.svg";
import GithubIcon from "~/public/icons/social/github.svg";
import MediumIcon from "~/public/icons/social/medium.svg";
import LinkedinIcon from "~/public/icons/social/linkedin.svg";

export default function Social(props: {
  platform: "twitter" | "github" | "medium" | "linkedin";
  link: string;
}) {
  const { platform, link } = props;
  return (
    <li>
      <a href={link} target="_blank">
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
