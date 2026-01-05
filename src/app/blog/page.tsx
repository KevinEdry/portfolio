import React from "react";

import HeroArticle from "~/components/blog/article/hero-article";
import Article from "~/components/blog/article/article";
import { getAllPosts } from "~/utils/mdx";

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <div className="scrollbar-hidden flex h-full items-center justify-center overflow-y-auto px-4 py-4 lg:overflow-visible lg:px-0 lg:py-0">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex shrink-0 flex-col gap-3 lg:w-1/2">
          {posts[0] != null ? (
            <HeroArticle
              id={posts[0].slug}
              title={posts[0].title}
              readTime={posts[0].readTime}
              image={posts[0].thumbnail}
              publishedAt={new Date(posts[0].publishedAt)}
              summary={posts[0].summary}
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2">
          {posts.slice(1).map((post) => (
            <Article
              key={post.slug}
              id={post.slug}
              title={post.title}
              image={post.thumbnail}
              publishedAt={new Date(post.publishedAt)}
              summary={post.summary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
