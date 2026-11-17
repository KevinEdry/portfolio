"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export interface Repo {
  name: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
  thumbnail?: string;
  category: "author" | "maintainer" | "contributor";
}

// Entry: rows cascade in while their hairline rules draw across, and every
// repo name scrambles through the accent colour before settling — a
// directory resolving. tweenLength stays off so scrambles never reflow a row.
// Hover: the list focuses the row (siblings dim), an accent band wipes
// across it flipping the text to white, and the name re-scrambles.
export default function RepoList({ repos }: { repos: Repo[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const entranceDone = useRef(false);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (list == null) return;
    if (reduced()) {
      entranceDone.current = true;
      return;
    }

    gsap.registerPlugin(ScrambleTextPlugin);
    const rows = list.querySelectorAll("li");
    const names = list.querySelectorAll("[data-repo-name]");

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          entranceDone.current = true;
        },
      });
      timeline
        .fromTo(
          rows,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            clearProps: "transform,opacity,visibility",
          },
          0,
        )
        .fromTo(
          rows,
          { "--rule-scale": 0 },
          {
            "--rule-scale": 1,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: 0.07,
          },
          0.1,
        );
      names.forEach((name, index) => {
        const text = name.textContent ?? "";
        timeline
          .set(name, { color: "#E8820C" }, 0.1 + index * 0.07)
          .to(
            name,
            {
              duration: 0.7,
              scrambleText: {
                text,
                chars: "lowerCase",
                speed: 1,
                tweenLength: false,
              },
              ease: "none",
            },
            0.1 + index * 0.07,
          )
          .to(
            name,
            {
              color: "#1A1D29",
              duration: 0.3,
              ease: "power1.out",
              clearProps: "color",
            },
            0.6 + index * 0.07,
          );
      });
    }, list);

    return () => {
      entranceDone.current = false;
      context.revert();
    };
  }, [repos]);

  // playful re-scramble, only once the entrance has finished
  const enterRow = (repo: Repo, row: HTMLElement) => {
    if (reduced() || !entranceDone.current) return;
    const name = row.querySelector("[data-repo-name]");
    if (name == null) return;
    gsap.killTweensOf(name);
    gsap.to(name, {
      duration: 0.45,
      scrambleText: {
        text: repo.name,
        chars: "lowerCase",
        speed: 1,
        tweenLength: false,
      },
      ease: "none",
    });
  };

  return (
    <ul
      ref={listRef}
      className="group/list scrollbar-hidden min-h-0 flex-1 overflow-y-auto"
    >
      {repos.map((repo) => (
        <li
          key={repo.name}
          className="relative transition-opacity duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-[var(--rule-scale,1)] after:bg-border group-hover/list:opacity-40 hover:!opacity-100"
        >
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(event) =>
              enterRow(repo, event.currentTarget as HTMLElement)
            }
            className="group relative flex flex-col gap-1 py-5 lg:flex-row lg:items-center lg:gap-8"
          >
            <span
              aria-hidden
              className="absolute -inset-x-3 inset-y-1.5 origin-left scale-x-0 rounded-lg bg-primary transition-transform duration-[450ms] ease-out group-hover:scale-x-100"
            />
            <span
              data-repo-name
              className="relative w-56 shrink-0 overflow-hidden whitespace-nowrap text-xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
            >
              {repo.name}
            </span>
            <span className="relative min-w-0 flex-1 truncate text-sm leading-6 text-text-secondary transition-colors duration-300 group-hover:text-white/90">
              {repo.description}
            </span>
            <span className="relative flex shrink-0 items-center gap-6 text-xs uppercase tracking-[0.12em] text-text-muted transition-colors duration-300 group-hover:text-white/80 lg:w-64 lg:justify-end">
              <span>{repo.category}</span>
              <span className="normal-case tracking-normal">
                {repo.language}
              </span>
              {repo.stars !== undefined && (
                <span className="tabular-nums">★ {repo.stars}</span>
              )}
              <span
                aria-hidden
                className="text-text/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
