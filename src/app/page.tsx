"use client";

import Signature from "~/public/icons/signature.svg";
import Image from "next/image";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { NavigationContext } from "~/providers/NavigationProvider";
import Button from "~/ui/button/button";

const PROOF_POINTS = [
  "Co-founded Shapeshift Gaming and Divart — through AWS Floor 28, Fusion LA, and Facebook for Startups.",
  "Led engineering as VP of R&D at Youleap.",
  "Polyglot by habit — TypeScript, Python, Java, Nix, whatever the problem calls for — and an open-source author, maintainer, and contributor.",
];

export default function About() {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();

  return (
    <div className="scrollbar-hidden flex h-full w-full overflow-y-auto px-4 py-4 lg:px-0 lg:py-0">
      <div className="my-auto flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex shrink-0 justify-center">
          <div className="group relative aspect-[3/4] w-44 overflow-hidden rounded-lg shadow-xl shadow-black/50 lg:w-[320px]">
            <Image
              src="/images/avatar-lake.jpg"
              alt="Kevin Edry at Lake Louise, mountains behind him"
              priority
              fill
              sizes="(min-width: 1024px) 320px, 176px"
              className="object-cover object-[50%_30%] brightness-[0.85] contrast-105 saturate-[0.3] transition-all duration-300 group-hover:brightness-100 group-hover:saturate-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-image/40 transition-opacity duration-300 group-hover:opacity-0"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
          </div>
        </div>
        <div className="flex max-w-xl flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
              Entrepreneur · Manager · Engineer
            </p>
            <h1 className="text-4xl font-black leading-none lg:text-6xl">
              Kevin Edry
            </h1>
            <hr className="w-40 text-primary" />
          </div>

          <p className="max-w-xl text-lg leading-7">
            I build products and the teams that ship them — from the first
            line of code to the company around it.
          </p>

          <ul className="flex max-w-xl flex-col gap-3">
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 leading-6">
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-5 shrink-0 bg-primary"
                />
                {point}
              </li>
            ))}
          </ul>

          <p className="max-w-xl leading-6 text-text-secondary">
            These days I&apos;m a senior engineer in Seattle, shipping
            production systems and writing about how engineering teams
            actually work — the blog and the bookshelf are where that lives.
            After hours I run{" "}
            <a
              href="https://seattlerooftops.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text underline decoration-primary underline-offset-4 hover:text-primary"
            >
              seattlerooftops.com
            </a>
            , a field guide to the city&apos;s rooftop bars.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Button type="solid" onClick={() => navigateTo("/contact", pathname)}>
              Get in touch
            </Button>
            <Button type="outline" onClick={() => navigateTo("/blog", pathname)}>
              Read the blog
            </Button>
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 flex-col items-center justify-center gap-6 self-stretch border-l border-border pl-14 lg:flex">
          <Signature className="h-44 opacity-80" />
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
            Seattle, WA
          </p>
        </div>
      </div>
    </div>
  );
}
