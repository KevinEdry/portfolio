"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import Menu from "~/components/menu/menu";
import HeroTitle from "~/components/hero-title/hero-title";
import NavigationArrow from "~/components/navigation-arrow/navigation-arrow";
import React, { useContext } from "react";
import PageAnimatePresence from "~/ui/page-animation-presence/page-animation-presence";
import { NavigationContext } from "~/providers/NavigationProvider";
import MotionSocial from "../social/motion-social";

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
        <LayoutGroup id="hero">
          <div className="flex flex-1 flex-col">
            <div className="flex h-1/6 w-full items-center justify-between">
              <motion.div layoutId="hero" animate>
                <HeroTitle />
              </motion.div>
              <ul className="flex gap-8">
                <AnimatePresence>
                  <MotionSocial
                    key={`social_0`}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0,
                      },
                    }}
                    platform="linkedin"
                    link="https://www.linkedin.com/in/kevinedry/"
                  />
                  <MotionSocial
                    key={`social_1`}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.1,
                      },
                    }}
                    platform="github"
                    link="https://github.com/KevinEdry"
                  />
                  <MotionSocial
                    key={`social_2`}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.2,
                      },
                    }}
                    platform="medium"
                    link="https://medium.com/@techg9"
                  />
                  <MotionSocial
                    key={`social_3`}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.3,
                      },
                    }}
                    platform="twitter"
                    link="https://twitter.com/KevinEdry"
                  />
                </AnimatePresence>
              </ul>
            </div>
            <div className="flex flex-1">
              <Menu />
              <main className="flex h-full w-full flex-col">
                <PageAnimatePresence>
                  <motion.section
                    layout="size"
                    variants={variants}
                    initial={
                      direction === "up"
                        ? "down"
                        : direction === "down"
                          ? "up"
                          : "fade"
                    }
                    animate={{
                      y: 0,
                      opacity: 1,
                      width: "100%",
                      height: "100%",
                    }}
                    exit={direction}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex h-full flex-1 items-center"
                  >
                    {children}
                  </motion.section>
                </PageAnimatePresence>
              </main>
            </div>
            <div className="absolute bottom-32 right-0 flex flex-col">
              <NavigationArrow direction="up" />
              <NavigationArrow direction="down" />
            </div>
          </div>
        </LayoutGroup>
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
