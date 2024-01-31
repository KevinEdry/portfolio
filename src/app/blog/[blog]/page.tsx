import Image from "next/image";
import Link from "next/link";
import Social from "~/components/social/social";
import ExitIcon from "~/public/icons/exit.svg";

export default async function Post() {
  //TODO: Make an async call to get posts from any CMS of choice

  return (
    <div className="bg-background absolute left-0 top-0 z-10 h-full w-full">
      <Link href={"/blog/"}>
        <ExitIcon className="absolute right-10 top-10 cursor-pointer" />
      </Link>
      <div className="container mx-auto mt-32 flex w-[680px] flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">Why Scrum is a Myth</h1>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/images/profile.jpeg"
            width={50}
            height={50}
            alt="Kevin's profile picture"
            className="rounded-full"
          />
          <div className="flex w-full items-center justify-between gap-1">
            <div>
              <h3 className="font-bold">Kevin Edry</h3>
              <h4 className="text-sm text-text-secondary">
                5 min read · Jan 9, 2024
              </h4>
            </div>
            <ul className="flex gap-8">
              <Social
                platform="linkedin"
                link="https://www.linkedin.com/in/kevinedry/"
              />
              <Social platform="github" link="https://github.com/KevinEdry" />
              <Social platform="medium" link="https://medium.com/@techg9" />
              <Social platform="twitter" link="https://twitter.com/KevinEdry" />
            </ul>
          </div>
        </div>
        <hr className="w-full text-primary" />
        <p className="text-lg leading-6 text-text-secondary">
          At some point, every technical leader faces the challenge of deciding
          on the best project management framework for their development team.
          The options are somewhat limited if reinventing the wheel isn’t on
          your agenda (I’m looking at you, Google) with the usual suspects —
          Agile, Waterfall, Kanban, and Scrum. Today, let’s take a detailed look
          at SCRUM. This project management framework, developed by Jeff
          Sutherland, is centered around the concept of sprints — short, focused
          periods of work aimed at completing specific tasks within a larger
          project. Unlike what its name might suggest, “Scrum” isn’t an acronym.
          It’s borrowed from rugby, referring to a team strategy to restart
          play. So why is Scrum so bad? At its heart, Scrum is all about being
          results-driven — a concept that sounds fantastic on paper. The idea of
          delivering results as fast as possible is attractive to most. However,
          this is where the complexity of sprints comes into play. Sprints in
          Scrum require careful balancing, almost like a Goldilocks scenario, to
          make the framework work. If sprints are too short, it’s a compromise
          on quality. Engineers may feel overwhelmed by the relentless pace,
          leading to burnout. This not only affects morale but also makes
          gauging team performance a challenge. On the flip side, if your
          sprints are too long, congratulations — you’re doing Waterfall with
          extra steps, and again, measuring and adjusting team performance
          becomes equally challenging.
        </p>
      </div>
    </div>
  );
}
