import React from "react";
import type { Metadata } from "next";

import PostList from "~/components/blog/post-list";
import WaveHeading from "~/components/text/wave-heading";
import ScrambleText from "~/components/text/scramble-text";
import { getAllPosts } from "~/utils/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays on engineering leadership, team dynamics, and how software teams actually work.",
};

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-4 lg:gap-8 lg:px-0 lg:py-8">
      <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-2">
          <ScrambleText
            text="The journal"
            className="text-sm uppercase tracking-[0.2em] text-text-secondary"
          />
          <WaveHeading
            text="Field notes"
            className="text-5xl font-black leading-none tracking-tight lg:text-7xl"
          />
        </div>
        <p className="max-w-md leading-6 text-text-secondary lg:text-right">
          Essays on engineering leadership, team dynamics, and how software
          teams actually work.
        </p>
      </div>
      <div className="scrollbar-hidden flex-1 overflow-y-auto">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
