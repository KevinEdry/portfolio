"use client";

import gsap from "gsap";
import Image from "next/image";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { NavigationContext } from "~/providers/NavigationProvider";
import type { PostMeta } from "~/utils/mdx";

// Editorial index: oversized title rows, and a floating thumbnail that
// chases the cursor across the list (GSAP quickTo springs), swapping its
// image as the pointer crosses each row.
export default function PostList({ posts }: { posts: PostMeta[] }) {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);
  const [active, setActive] = useState<PostMeta | null>(null);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (preview == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    moveX.current = gsap.quickTo(preview, "x", {
      duration: 0.4,
      ease: "power3",
    });
    moveY.current = gsap.quickTo(preview, "y", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const onMouseMove = (event: React.MouseEvent) => {
    moveX.current?.(event.clientX + 28);
    moveY.current?.(event.clientY - 90);
  };

  const show = (post: PostMeta) => {
    const preview = previewRef.current;
    setActive(post);
    if (preview == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(preview, {
      autoAlpha: 1,
      scale: 1,
      rotation: -3,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const hide = () => {
    const preview = previewRef.current;
    if (preview == null) return;
    gsap.to(preview, {
      autoAlpha: 0,
      scale: 0.92,
      rotation: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <>
      <ul
        ref={listRef}
        onMouseMove={onMouseMove}
        onMouseLeave={hide}
        className="flex w-full flex-col"
      >
        {posts.map((post, index) => (
          <li key={post.slug} className="border-b border-border">
            <a
              href={`/blog/${post.slug}`}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(`/blog/${post.slug}`, pathname);
              }}
              onMouseEnter={() => show(post)}
              className="group flex flex-col gap-2 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-7"
            >
              <span className="flex min-w-0 items-center gap-4 lg:gap-6">
                <span className="shrink-0 text-sm font-medium tabular-nums text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-2xl font-black leading-tight tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary lg:text-4xl xl:text-5xl">
                  {post.title}
                </span>
              </span>
              <span className="shrink-0 pl-8 text-sm text-text-muted lg:pl-0 lg:text-right">
                {format(new Date(post.publishedAt), "MMM yyyy")} ·{" "}
                {post.readTime} min
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden opacity-0 lg:block"
      >
        <div className="glass-strong overflow-hidden rounded-2xl p-1.5">
          <div className="relative h-[180px] w-[280px] overflow-hidden rounded-xl">
            {active != null && (
              <Image
                src={active.thumbnail}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
