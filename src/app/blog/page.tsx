"use client";

import React from "react";
import HeroArticle from "~/components/about/article/hero-article";
import Article from "~/components/about/article/article";

export default function Blog() {
  return (
    <React.Fragment>
      <div className="flex h-[80%] w-1/2 flex-col gap-3">
        <HeroArticle
          title="Why SCRUM is a myth"
          readTime={300}
          image="/images/article1.webp"
          link="https://medium.com/@techg9/why-scrum-is-a-myth-46f34b2fe16d"
          publishedAt={new Date()}
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinventing the wheel isn’t on your agenda (I’m looking at you, Google) with the usual suspects — Agile, Waterfall, Kanban, and Scrum."
        />
      </div>
      <div className="flex h-[80%] w-1/2 flex-col gap-4">
        <Article
          title="Gaming During Work: A Distraction Or A Means For Productivity?"
          publishedAt={new Date()}
          image="/images/article2.gif"
          link="https://medium.com/@techg9/gaming-during-work-a-distraction-or-a-means-for-productivity-4fd25bd23060"
          summary="Gaming, in general, is referred to as a hobby, something to do in your free time. It is often described as an unproductive activity that, in its core, is about wasting that valuable..."
        />
      </div>
    </React.Fragment>
  );
}
