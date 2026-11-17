"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, useGSAP);

interface Repo {
  name: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
  thumbnail?: string;
  category: "author" | "maintainer" | "contributor";
}

interface RepoGridProps {
  repos: Repo[];
}

// Bento-focus: the clicked tile takes the hero slot and every other tile
// shifts one step along the slot cycle, morphed with GSAP Flip.
const SLOT_COUNT = 7;

const SLOT_AREAS = ["hero", "a", "b", "c", "d", "e", "f"];

const GLOWS: Record<string, string> = {
  "nestjs-trpc": "rgba(232, 130, 12, 0.3)",
  "runelite-quest-voiceover": "rgba(201, 162, 39, 0.28)",
  nixpkgs: "rgba(82, 119, 195, 0.3)",
  tRPC: "rgba(57, 140, 203, 0.3)",
  devenv: "rgba(38, 166, 154, 0.28)",
  quirrel: "rgba(124, 92, 191, 0.28)",
  "nextjs-auth0": "rgba(130, 140, 160, 0.25)",
};

function glowFor(name: string) {
  return GLOWS[name] ?? "rgba(130, 140, 160, 0.25)";
}

export default function RepoGrid({ repos }: RepoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef(new Map<string, HTMLDivElement>());
  const pendingFlip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const exHeroName = useRef<string | null>(null);
  const animating = useRef(false);
  const [slots, setSlots] = useState(() =>
    Array.from({ length: SLOT_COUNT }, (_, i) => i),
  );

  const slotOf = (repoIndex: number) => slots.indexOf(repoIndex);

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
      gsap.from(tiles, {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
      });
      gsap.fromTo(
        "[data-detail-line]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.6,
        },
      );
    },
    { scope: containerRef },
  );

  function focusRepo(repoIndex: number) {
    const position = slotOf(repoIndex);
    if (position <= 0 || animating.current) return;
    const mediaEls = repos
      .map((repo) => mediaRefs.current.get(repo.name))
      .filter((el) => el !== undefined);
    pendingFlip.current = Flip.getState(mediaEls);
    const heroIndex = slots[0];
    exHeroName.current =
      heroIndex === undefined ? null : (repos[heroIndex]?.name ?? null);
    const shift = SLOT_COUNT - position;
    setSlots((current) =>
      current.map((_, slot) => {
        const from = (slot - shift + SLOT_COUNT) % SLOT_COUNT;
        return current[from] ?? 0;
      }),
    );
  }

  useLayoutEffect(() => {
    const state = pendingFlip.current;
    if (!state || !containerRef.current) return;
    pendingFlip.current = null;
    animating.current = true;

    const scope = containerRef.current;
    const heroLines = scope.querySelectorAll("[data-detail-line]");
    const exHero = exHeroName.current
      ? mediaRefs.current.get(exHeroName.current)
      : undefined;
    const exHeroLabel = exHero?.querySelector("[data-label-line]") ?? null;

    gsap.set(heroLines, { yPercent: 110 });
    if (exHeroLabel) gsap.set(exHeroLabel, { yPercent: 110 });

    Flip.from(state, {
      targets: repos
        .map((repo) => mediaRefs.current.get(repo.name))
        .filter((el) => el !== undefined),
      duration: 0.95,
      ease: "power4.inOut",
      onComplete: () => {
        animating.current = false;
      },
    });
    gsap.to(heroLines, {
      yPercent: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.09,
      delay: 0.3,
    });
    if (exHeroLabel) {
      gsap.to(exHeroLabel, {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.75,
      });
    }
  }, [slots]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 w-full flex-1 items-center justify-center"
    >
      <div className="grid w-full grid-cols-2 gap-3 [grid-template-areas:'hero_hero'_'hero_hero'_'a_a'_'b_c'_'d_e'_'f_f'] lg:aspect-[2.8/1] lg:max-h-full lg:grid-cols-7 lg:grid-rows-2 lg:[grid-template-areas:'hero_hero_a_a_b_c_c'_'hero_hero_d_e_e_f_f']">
        {repos.slice(0, SLOT_COUNT).map((repo, repoIndex) => {
          const slot = slotOf(repoIndex);
          const isHero = slot === 0;
          const Tile = isHero ? "div" : "button";
          return (
            <Tile
              key={repo.name}
              type={isHero ? undefined : "button"}
              data-tile
              onClick={isHero ? undefined : () => focusRepo(repoIndex)}
              style={{ gridArea: SLOT_AREAS[slot] }}
              className={`group relative min-h-32 rounded-[20px] text-left ${
                isHero ? "z-10" : "cursor-pointer"
              }`}
            >
              <div
                ref={(el) => {
                  if (el) mediaRefs.current.set(repo.name, el);
                }}
                data-flip-id={repo.name}
                className="glass absolute inset-0 overflow-hidden rounded-[20px] text-text"
              >
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(120% 120% at 82% -8%, ${glowFor(repo.name)} 0%, rgba(255, 255, 255, 0) 58%)`,
                  }}
                />
                {repo.thumbnail !== undefined && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 top-3 block aspect-[2/1] translate-y-2 overflow-hidden rounded-xl opacity-0 transition-all duration-500 ease-out [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Image
                      src={repo.thumbnail}
                      alt=""
                      fill
                      sizes="440px"
                      className="object-cover"
                    />
                  </span>
                )}
                <span className="absolute right-5 top-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted/70">
                  {String(repoIndex + 1).padStart(2, "0")}
                </span>
                {isHero ? (
                  <span className="absolute inset-x-7 bottom-6 flex flex-col gap-3">
                    <span className="block overflow-hidden pb-[0.14em] [margin-bottom:-0.14em]">
                      <span
                        data-detail-line
                        className="block text-2xl font-semibold tracking-tight lg:text-3xl"
                      >
                        {repo.name}
                      </span>
                    </span>
                    <span className="block overflow-hidden">
                      <span
                        data-detail-line
                        className="block max-w-96 text-[15px] leading-normal text-text-secondary"
                      >
                        {repo.description}
                      </span>
                    </span>
                    <span className="block overflow-hidden">
                      <span
                        data-detail-line
                        className="flex items-center gap-5 text-[11px] uppercase tracking-[0.14em] text-text-muted"
                      >
                        <span>{repo.category}</span>
                        <span>{repo.language}</span>
                        {repo.stars !== undefined && (
                          <span className="tabular-nums">★ {repo.stars}</span>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto font-medium normal-case tracking-normal text-primary transition-colors hover:text-text"
                        >
                          View repo →
                        </a>
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className="absolute bottom-4 left-5 block overflow-hidden pb-[0.16em] [margin-bottom:-0.16em]">
                    <span
                      data-label-line
                      className="block whitespace-nowrap text-sm font-medium"
                    >
                      {repo.name}
                    </span>
                  </span>
                )}
              </div>
            </Tile>
          );
        })}
      </div>
    </div>
  );
}
