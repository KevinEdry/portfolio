import Menu from "~/components/menu/menu";
import HeroTitle from "~/components/hero-title/hero-title";
import NavigationArrow from "~/components/navigation-arrow/navigation-arrow";
import React, { useContext } from "react";
import PageAnimatePresence from "~/ui/page-animation-presence/page-animation-presence";
import { NavigationContext } from "~/providers/NavigationProvider";
import Social from "../social/motion-social";

export default function PageTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const variants = {
    up: {
      y: 300,
      opacity: 0,
    },
    down: {
      y: -300,
      opacity: 0,
    },
    fade: {
      opacity: 0,
      zIndex: 300,
    },
  };

  const { direction } = useContext(NavigationContext);

  return (
    <React.Fragment>
      <div className="container mx-auto hidden h-screen max-h-full flex-row bg-cover font-roboto text-text sm:flex">
        <div className="flex flex-1 flex-col">
          <div className="flex h-1/6 w-full items-center justify-between">
            <HeroTitle />
            <ul className="flex gap-8">
              <Social
                key={`social_0`}
                animationDelay={0}
                platform="linkedin"
                link="https://www.linkedin.com/in/kevinedry/"
              />
              <Social
                key={`social_1`}
                animationDelay={0.1}
                platform="github"
                link="https://github.com/KevinEdry"
              />
              <Social
                key={`social_2`}
                animationDelay={0.2}
                platform="medium"
                link="https://medium.com/@techg9"
              />
              <Social
                key={`social_3`}
                animationDelay={0.3}
                platform="twitter"
                link="https://twitter.com/KevinEdry"
              />
            </ul>
          </div>
          <div className="flex flex-1">
            <Menu />
            <main className="flex h-full w-full flex-col">{children}</main>
          </div>
          <div className="absolute bottom-32 right-0 flex flex-col">
            <NavigationArrow direction="up" />
            <NavigationArrow direction="down" />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex h-full flex-col flex-nowrap items-center justify-center gap-3 overflow-hidden p-5 font-roboto text-text sm:hidden">
        <h1 className="mt-auto text-center text-3xl">
          <span className="font-extrabold">
            Leading with innovation,
            <br />
          </span>
          not just implementation
        </h1>
        <hr className="w-32 text-primary" />
        <p className="text-center text-lg">
          As an
          <span className="font-bold"> Engineering Manager</span>, I prioritize
          strategic leadership and team development over pixel-perfect layouts.
        </p>
        <div className="text-center text-text/70"></div>
        <div className="text-6xl">😎</div>
        <div className="mt-auto text-center text-text/70">
          A responsive design update is in the pipeline as I continuously
          improve the website. Stay tuned!
        </div>
      </div>
    </React.Fragment>
  );
}
