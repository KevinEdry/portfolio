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
          publishedAt={new Date()}
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinventing the wheel isn’t on your agenda (I’m looking at you, Google) with the usual suspects — Agile, Waterfall, Kanban, and Scrum."
        />
      </div>
      <div className="flex h-[80%] w-1/2 flex-col gap-4">
        <Article
          title="Why SCRUM is a myth"
          publishedAt={new Date()}
          link="https://kevin-edry.com/"
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinven..."
        />
        <Article
          title="Why SCRUM is a myth"
          publishedAt={new Date()}
          link="https://kevin-edry.com/"
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinven..."
        />
        <Article
          title="Why SCRUM is a myth"
          publishedAt={new Date()}
          link="https://kevin-edry.com/"
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinven..."
        />
        <Article
          title="Why SCRUM is a myth"
          publishedAt={new Date()}
          link="https://kevin-edry.com/"
          summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinven..."
        />
      </div>
    </React.Fragment>
  );
}
