"use client";

import Signature from "~/public/icons/signature.svg";
import HeroTitle from "~/components/hero-title/hero-title";
import Image from "next/image";
import gsap from "gsap";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NavigationContext } from "~/providers/NavigationProvider";
import Button from "~/ui/button/button";
import WaveHeading from "~/components/text/wave-heading";
import ScrambleText from "~/components/text/scramble-text";
import WordReveal from "~/components/text/word-reveal";

const CREDITS = [
  "Co-founder — Shapeshift Gaming & Divart",
  "VP of R&D — Youleap",
  "Open-source author & maintainer",
];

export default function About() {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();
  const photoRef = useRef<HTMLDivElement>(null);

  // The portrait opens out of a clipped frame while the page reveals.
  useLayoutEffect(() => {
    const photo = photoRef.current;
    if (photo == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      photo,
      { clipPath: "inset(16% 16% 16% 16% round 32px)", scale: 1.1 },
      {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        scale: 1,
        duration: 1.3,
        ease: "power3.out",
        delay: 0.25,
        clearProps: "clipPath,transform",
      },
    );
  }, []);

  return (
    <div className="scrollbar-hidden flex h-full w-full overflow-y-auto px-4 py-4 lg:overflow-visible lg:px-0 lg:py-0">
      <div className="my-auto grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6">
          <ScrambleText
            text="Entrepreneur · Manager · Engineer"
            className="text-sm uppercase tracking-[0.2em] text-text-secondary"
          />
          <WaveHeading
            text="Kevin Edry"
            className="max-w-[5.2em] text-7xl font-black leading-[0.92] tracking-tight lg:text-[clamp(6rem,10.5vw,10rem)]"
          />
          <WordReveal
            text="I build products and the teams that ship them — from the first line of code to the company around it."
            className="max-w-xl text-xl font-medium leading-8 text-text-secondary lg:text-2xl lg:leading-9"
          />
          <div className="flex items-center gap-4 pt-1">
            <Button type="solid" onClick={() => navigateTo("/contact", pathname)}>
              Get in touch
            </Button>
            <Button type="outline" onClick={() => navigateTo("/blog", pathname)}>
              Read the blog
            </Button>
          </div>
          <div className="flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[13px] text-text-muted">
            {CREDITS.map((credit, index) => (
              <React.Fragment key={credit}>
                {index > 0 && (
                  <span aria-hidden className="h-3 w-px bg-border" />
                )}
                <span>{credit}</span>
              </React.Fragment>
            ))}
          </div>
          <p className="text-[13px] text-text-muted">
            After hours:{" "}
            <a
              href="https://seattlerooftops.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-secondary underline decoration-primary underline-offset-4 hover:text-primary"
            >
              seattlerooftops.com
            </a>{" "}
            — the city&apos;s rooftop bars, reviewed by locals.
          </p>
        </div>

        <div className="relative hidden flex-col items-center gap-4 lg:flex">
          <HeroTitle />
          <div className="relative">
            <div
              ref={photoRef}
              className="group relative aspect-[3/4] w-[300px] overflow-hidden rounded-[10px] shadow-2xl shadow-black/20 xl:w-[360px]"
            >
              <Image
                src="/images/avatar-lake.jpg"
                alt="Kevin Edry at Lake Louise, mountains behind him"
                priority
                fill
                sizes="360px"
                className="object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <Signature className="absolute -bottom-10 -right-8 h-28 rotate-[-4deg] text-text opacity-80" />
          </div>
          <p className="pt-8 text-xs uppercase tracking-[0.2em] text-text-muted">
            Seattle, WA
          </p>
        </div>
      </div>
    </div>
  );
}
